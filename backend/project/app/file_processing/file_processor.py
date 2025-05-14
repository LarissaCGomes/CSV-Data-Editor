import pandas as pd
import io
import csv
from django.db import models
from typing import List, Dict
import numpy as np

class FileProcessor():
    def __init__(self):
        self.tables = {}
    
    def process_csv(self, file_obj: str, table_name:str, table_model: models.Model):
        encod = 'ISO-8859-1'

        sample = file_obj.read(1024).decode(encod)
        file_obj.seek(0)

        sniffer = csv.Sniffer()
        delim = sniffer.sniff(sample).delimiter
        
        try:
            text_stream = io.StringIO(file_obj.read().decode(encod))
            dataframe = pd.read_csv(text_stream, delimiter=delim)
        except Exception as e:
            raise Exception(f'Erro ao ler o csv {table_name}: {str(e)}')
        
        try:
            schema = self.get_schema(table_model)
        except Exception as e:
            raise Exception(f'Erro ao pegar o schema do modelo {table_name}: {e}')
        
        try:
            padronized_df = self.padronize_dataframe(dataframe, table_name, schema.keys())
        except Exception as e:
            raise Exception(f'Erro ao padronizar o dataframe {table_name}: {e}')
        
        try:
            not_nan_coord = self.type_validation(padronized_df, schema)
        except Exception as e:
            raise Exception(f'Erro na verificação de tipos {table_name}: {e}')
        
        return padronized_df.fillna('NaN'), not_nan_coord, schema

    def get_schema(self, model: models.Model):
        type_mapping = {
            'int64': 'BigAutoField',
            'float64': 'FloatField',
            'object': 'CharField',
            'datetime64[ns]': 'DateFiel TimeField'
        }
        schema = {}

        for field in model._meta.get_fields():
            if hasattr(field, 'column'):
                field_type = field.get_internal_type()
                if field_type == 'ForeignKey':
                    field_type = field.related_model._meta.pk.get_internal_type()

                for key, value in type_mapping.items():
                    if field_type in value.split(' '):
                        schema[field.name] = key
                        break
        return schema
    
    def padronize_dataframe(self, dataframe: pd.DataFrame, table_name: str, schema_cols: List[str]):
        columns_to_rename = {
            'pressure': 'profundidade',
            'estacoes_id':'estacao_nome',
            'tempo':'datetime',
            'acdom':'acdom440'
        }

        dataframe.columns = dataframe.columns.str.lower()

        if 'pressure' in dataframe.columns.tolist():
            dataframe['pressure'] = dataframe['pressure'].apply(lambda cel_val: np.nan if not isinstance(cel_val, int) else cel_val)

        for col_name in columns_to_rename.keys():
            if col_name in dataframe.columns:
                if col_name == 'estacoes_id' and table_name != 'estacoes':
                    continue
                dataframe = dataframe.rename(columns={col_name: columns_to_rename[col_name]})

        columns_match = [col_name for col_name in dataframe.columns if col_name not in ['id'] and col_name in schema_cols]
        
        dataframe = dataframe[columns_match]
        
        return dataframe
    
    def type_validation(self, dataframe: pd.DataFrame, schema: Dict[str, str]):
        not_nan_coord = []

        try:
            schema = {col: dtype for col, dtype in schema.items() if col in dataframe.columns.tolist()}

            dataframe = dataframe.astype(schema)

        except Exception as e:
            
            errors_dataframe = pd.DataFrame(np.nan, index=dataframe.index, columns=dataframe.columns)
            

            for col_name in dataframe.columns.tolist():
                col_type = schema[col_name]

                try:
                    dataframe.loc[:, col_name] = dataframe[col_name].astype(col_type)
                except:
                    ref_table = pd.to_numeric(dataframe[col_name], errors='coerce')

                    bool_table = ref_table.notna()

                    new_col = np.where(bool_table, np.nan, dataframe[col_name])

                    errors_dataframe[col_name] = new_col

            not_nan_coord = errors_dataframe.stack().index.tolist()
            
        return not_nan_coord