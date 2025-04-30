from django.db import models
from django.conf import settings

#classe para adicionar as colunas de wavelength dinamicamente
class DynamicFieldsModel(models.Model):
    class Meta:
        abstract = True

    @classmethod
    def add_wavelength_fields(cls, start, end, field_class, **kwargs):
        for i in range(start, end + 1):
            field_name = f'x{i}'
            field = field_class(**kwargs) #usa as classes de field do django
            field.contribute_to_class(cls, field_name) #adiciona o attr

class Campanhas(models.Model):
    campanha_nome = models.CharField(max_length=200)
    regiao = models.CharField(max_length=200)
    local = models.CharField(max_length=200)
    descricao = models.CharField(max_length=200)
    metadados = models.CharField(max_length=200)

    class Meta:
        db_table = 'campanhas'

    def __str__(self):
        return self.campanha_nome

class Estacoes(models.Model):
    estacao_nome = models.CharField(max_length=200)
    campanha = models.ForeignKey(Campanhas, on_delete=models.CASCADE, related_name='estacoes')
    lat = models.FloatField()
    long = models.FloatField()
    date = models.DateField()
    time = models.TimeField()
    descricao = models.CharField(max_length=200)

    class Meta:
        db_table = 'estacoes'

    def __str__(self):
        return self.estacao_nome
    
class Acdom(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_acdom')
    
    class Meta:
        db_table = 'acdom'

    def __str__(self):
        return f"Acdom {self.id}"

Acdom.add_wavelength_fields(
    start=220,
    end=800,
    field_class=models.FloatField,
)

class AcsAtenuationTs(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_acs_atenuation_ts')
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'acs_atenuation_ts'

    def __str__(self):
        return f"ACS Atenuation TS {self.id}"

AcsAtenuationTs.add_wavelength_fields(
    start=400,
    end=750,
    field_class=models.FloatField,
)

class AcsFlat(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_acs_flat')
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'acs_flat'

    def __str__(self):
        return f"ACS Flat {self.id}"

AcsFlat.add_wavelength_fields(
    start=400,
    end=750,
    field_class=models.FloatField,
)

class AcsKirk(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_acs_kirk')
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'acs_kirk'

    def __str__(self):
        return f"ACS Kirk {self.id}"

AcsKirk.add_wavelength_fields(
    start=400,
    end=750,
    field_class=models.FloatField,
)

class AcsTs(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_acs_ts')
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'acs_ts'

    def __str__(self):
        return f"ACS TS {self.id}"

AcsTs.add_wavelength_fields(
    start=400,
    end=750,
    field_class=models.FloatField,
)

class AdetMean(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_adet_mean')

    class Meta:
        db_table = 'adet_mean'

    def __str__(self):
        return f"Adet Mean {self.id}"

AdetMean.add_wavelength_fields(
    start=220,
    end=800,
    field_class=models.FloatField,
)

class AphyMean(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_aphy_mean')

    class Meta:
        db_table = 'aphy_mean'

    def __str__(self):
        return f"Aphy Mean {self.id}"

AphyMean.add_wavelength_fields(
    start=220,
    end=800,
    field_class=models.FloatField,
)
 
class Ed(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_ed')
    datetime = models.CharField(max_length=255, null=True, blank=True)
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'ed'

    def __str__(self):
        return f"Ed {self.id}"

Ed.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class Es(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_es')
    datetime = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'es'

    def __str__(self):
        return f"Es {self.id}"

Es.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)
    
class Eu(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_eu')
    datetime = models.CharField(max_length=255, null=True, blank=True)
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'eu'

    def __str__(self):
        return f"Eu {self.id}"

Eu.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class Kd(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_kd')

    class Meta:
        db_table = 'kd'

    def __str__(self):
        return f"Kd {self.id}"

Kd.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class Limnologia(models.Model):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_limnologia')
    chla = models.FloatField(null=True, blank=True)
    feofitina = models.FloatField(null=True, blank=True)
    tss = models.FloatField(null=True, blank=True)
    tsi = models.FloatField(null=True, blank=True)
    tso = models.FloatField(null=True, blank=True)
    secchi = models.FloatField(null=True, blank=True)
    dtc = models.FloatField(null=True, blank=True)
    dic = models.FloatField(null=True, blank=True)
    doc = models.FloatField(null=True, blank=True)
    acdom440 = models.FloatField(null=True, blank=True)
    profundidade = models.FloatField(null=True, blank=True)
    turbidez = models.FloatField(null=True, blank=True)
    ficocianina = models.FloatField(null=True, blank=True)
    clorofila_sonda = models.FloatField(null=True, blank=True)
    ficocianina_sonda = models.FloatField(null=True, blank=True)
    acdom_sonda = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'limnologia'

    def __str__(self):
        return f"Limnologia {self.id}"

class Lsky(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_lsky')
    datetime = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'lsky'

    def __str__(self):
        return f"Lsky {self.id}"

Lsky.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)
    
class Lu(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_lu')
    datetime = models.CharField(max_length=255, null=True, blank=True)
    profundidade = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'lu'

    def __str__(self):
        return f"Lu {self.id}"

Lu.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class Lw(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_lw')
    datetime = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'lw'

    def __str__(self):
        return f"Lw {self.id}"

Lw.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class RrsCompleta(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_rrs_completa')
    datetime = models.DateTimeField()

    class Meta:
        db_table = 'rrs_completa'

    def __str__(self):
        return f"RRS Completa {self.id}"

RrsCompleta.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)

class RrsMediana(DynamicFieldsModel):
    estacao = models.ForeignKey('Estacoes', on_delete=models.CASCADE, related_name='pontos_rrs_mediana')
    datetime = models.DateTimeField()

    class Meta:
        db_table = 'rrs_mediana'

    def __str__(self):
        return f"RRS Mediana {self.id}"

RrsMediana.add_wavelength_fields(
    start=400,
    end=900,
    field_class=models.FloatField,
)