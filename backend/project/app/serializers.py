from rest_framework import serializers
from .models import (
    Campanhas, Estacoes, Acdom, AcsAtenuationTs, AcsFlat, AcsKirk, AcsTs,
    AdetMean, AphyMean, Ed, Es, Eu, Kd, Limnologia, Lsky, Lu, Lw,
    RrsCompleta, RrsMediana
)

#usar modelSerializer para não precisar repertir os campos do model
class CampanhasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campanhas
        #exclue = [] para exlcuir campos
        fields = '__all__'

class EstacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacoes
        fields = '__all__'

class AcdomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acdom
        fields = '__all__'

class AcsAtenuationTsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcsAtenuationTs
        fields = '__all__'

class AcsFlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcsFlat
        fields = '__all__'

class AcsKirkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcsKirk
        fields = '__all__'

class AcsTsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcsTs
        fields = '__all__'

class AdetMeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdetMean
        fields = '__all__'

class AphyMeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = AphyMean
        fields = '__all__'

class EdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ed
        fields = '__all__'

class EsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Es
        fields = '__all__'

class EuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eu
        fields = '__all__'

class KdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kd
        fields = '__all__'

class LimnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Limnologia
        fields = '__all__'

class LskySerializer(serializers.ModelSerializer):
    class Meta:
        model = Lsky
        fields = '__all__'

class LuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lu
        fields = '__all__'

class LwSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lw
        fields = '__all__'

class RrsCompletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RrsCompleta
        fields = '__all__'

class RrsMedianaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RrsMediana
        fields = '__all__'