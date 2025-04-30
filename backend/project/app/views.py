from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .file_processing.file_processor import FileProcessor

from .models import (
    Campanhas, Estacoes, Acdom, AcsAtenuationTs, AcsFlat, AcsKirk, AcsTs,
    AdetMean, AphyMean, Ed, Es, Eu, Kd, Limnologia, Lsky, Lu, Lw,
    RrsCompleta, RrsMediana
)
from .serializers import (
    CampanhasSerializer, EstacoesSerializer, AcdomSerializer,
    AcsAtenuationTsSerializer, AcsFlatSerializer, AcsKirkSerializer,
    AcsTsSerializer, AdetMeanSerializer, AphyMeanSerializer, EdSerializer,
    EsSerializer, EuSerializer, KdSerializer, LimnologiaSerializer,
    LskySerializer, LuSerializer, LwSerializer, RrsCompletaSerializer,
    RrsMedianaSerializer
)

class CampanhasList(generics.ListAPIView):
    queryset = Campanhas.objects.all()
    serializer_class = CampanhasSerializer

class EstacoesList(generics.ListAPIView):
    queryset = Estacoes.objects.all()
    serializer_class = EstacoesSerializer

class AcdomList(generics.ListAPIView):
    queryset = Acdom.objects.all()
    serializer_class = AcdomSerializer

class AcsAtenuationTsList(generics.ListAPIView):
    queryset = AcsAtenuationTs.objects.all()
    serializer_class = AcsAtenuationTsSerializer

class AcsFlatList(generics.ListAPIView):
    queryset = AcsFlat.objects.all()
    serializer_class = AcsFlatSerializer

class AcsKirkList(generics.ListAPIView):
    queryset = AcsKirk.objects.all()
    serializer_class = AcsKirkSerializer

class AcsTsList(generics.ListAPIView):
    queryset = AcsTs.objects.all()
    serializer_class = AcsTsSerializer

class AdetMeanList(generics.ListAPIView):
    queryset = AdetMean.objects.all()
    serializer_class = AdetMeanSerializer

class AphyMeanList(generics.ListAPIView):
    queryset = AphyMean.objects.all()
    serializer_class = AphyMeanSerializer

class EdList(generics.ListAPIView):
    queryset = Ed.objects.all()
    serializer_class = EdSerializer

class EsList(generics.ListAPIView):
    queryset = Es.objects.all()
    serializer_class = EsSerializer

class EuList(generics.ListAPIView):
    queryset = Eu.objects.all()
    serializer_class = EuSerializer

class KdList(generics.ListAPIView):
    queryset = Kd.objects.all()
    serializer_class = KdSerializer

class LimnologiaList(generics.ListAPIView):
    queryset = Limnologia.objects.all()
    serializer_class = LimnologiaSerializer

class LskyList(generics.ListAPIView):
    queryset = Lsky.objects.all()
    serializer_class = LskySerializer

class LuList(generics.ListAPIView):
    queryset = Lu.objects.all()
    serializer_class = LuSerializer

class LwList(generics.ListAPIView):
    queryset = Lw.objects.all()
    serializer_class = LwSerializer

class RrsCompletaList(generics.ListAPIView):
    queryset = RrsCompleta.objects.all()
    serializer_class = RrsCompletaSerializer

class RrsMedianaList(generics.ListAPIView):
    queryset = RrsMediana.objects.all()
    serializer_class = RrsMedianaSerializer

class FileUploadView(APIView):
    def post(self, request, format=None):
        models_map = {
            'campanhas': Campanhas,
            'estacoes': Estacoes,
            'acdom': Acdom,
            'acs_atenuation_ts': AcsAtenuationTs,
            'acs_flat': AcsFlat,
            'acs_kirk': AcsKirk,
            'acs_ts': AcsTs,
            'adet_mean': AdetMean,
            'aphy_mean': AphyMean,
            'ed': Ed,
            'es': Es,
            'eu': Eu,
            'kd': Kd,
            'limnologia': Limnologia,
            'lsky': Lsky,
            'lu': Lu,
            'lw': Lw,
            'rrs_completa': RrsCompleta,
            'rrs_mediana': RrsMediana
        }
        
        files_json = request.FILES.items()  # 'files' é o nome usado no append do FormData

        if not files_json:
            return Response({"error": "Nenhum arquivo recebido"}, status=status.HTTP_400_BAD_REQUEST)
        
        files_data = {
            #name: file_obj
        }
        for name, file in request.FILES.items():
            if name.startswith('new_data_'):
                name = name.replace('new_data_', '')
                files_data[name] = file

        for table_name in files_data.keys():
            if table_name not in models_map:
                return Response(
                    {'error': f'Tabela {table_name} não encontrada '},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        file_proc = FileProcessor()

        processed_data = {
            #table_name: [data_json, not_nan_coord]
        }
        for table_name, file_obj in files_data.items():
            try:
                processed_df, errors_coord, schema = file_proc.process_csv(file_obj, table_name, models_map[table_name])

                dataframe_json = processed_df.to_dict(orient='records')

                processed_data[table_name] = [dataframe_json, errors_coord]

                print(f'{table_name} processado.')
            
            except Exception as e:
                return Response(
                    {'error': f'Erro ao processar o arquivo {table_name}.csv: {e}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(processed_data, status=status.HTTP_200_OK)

    # def post(self, request, format=None):
        

    #     table_name = request.data.get('name')
    #     if table_name not in models_map:
    #         return Response(
    #             {'error': f'Tabela {table_name} não encontrada'},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
        
    #     file_path = request.data.get('path')

    #     file_proc = FileProcessor()
    #     try:
    #         processed_df, not_nan_coord, schema = file_proc.process_csv(file_path, table_name, models_map[table_name])

    #         data_json = processed_df.to_dict(orient='records')

    #         return Response(
    #             {
    #                 'name': table_name,
    #                 'errors_coord': not_nan_coord,
    #                 'data_json': data_json
    #             },
    #             status=status.HTTP_200_OK
    #         )

    #     except Exception as e:
    #         return Response(
    #             {'Erro de processamento': str(e)}, status=status.HTTP_400_BAD_REQUEST
    #         )