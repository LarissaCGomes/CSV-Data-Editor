import os

dir_path = os.path.join(os.getcwd(), 'app')

files = [
    'campanhas',
    'estacoes',
    'acdom',
    'acs_atenuation_ts',
    'acs_flat',
    'acs_kirk',
    'acs_ts',
    'adet_mean',
    'aphy_mean',
    'ed',
    'es',
    'eu',
    'kd',
    'limnologia',
    'lsky',
    'lu',
    'lw',
    'rrs_completa',
    'rrs_mediana'
]

dirtype = {
    'models' : 'model',
    'serializers' : 'serializer',
    'views' : 'view'
}

for dir_name, file_sufix in dirtype.items():
    for filename in files:
        file_path = os.path.join(dir_path, dir_name, f'{filename}_{file_sufix}.py')

        with open(file_path, 'w') as file:
            pass