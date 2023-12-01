from rest_framework import serializers
from .models import KidneyDiseaseRequest, KidneyDiseaseResponse, KidneyDisease


class KidneyDiseaseSerializers(serializers.ModelSerializer):

    '''For serializers.ModelSerializer'''
    class Meta:
        model = KidneyDisease
        fields =  ['age', 'bp', 'sg', 'al', 'su', 'rbc', 'pc', 'pcc', 'ba', 'bgr', 'bu', 'sc', 'sod', 'pot',
                    'hemo', 'pcv', 'wc', 'rc', 'htn', 'dm', 'cad', 'appet', 'pe', 'ane']

class KidneyDiseaseRequestSerializers(serializers.ModelSerializer):

    '''For serializers.ModelSerializer'''
    class Meta:
        model = KidneyDiseaseRequest
        fields =  ['age', 'bp', 'sg', 'al', 'su', 'rbc', 'pc', 'pcc', 'ba', 'bgr', 'bu', 'sc', 'sod', 'pot',
                    'hemo', 'pcv', 'wc', 'rc', 'htn', 'dm', 'cad', 'appet', 'pe', 'ane', 'prediction']

class KidneyDiseaseResponseSerializers(serializers.ModelSerializer):

    '''For serializers.ModelSerializer'''
    class Meta:
        model = KidneyDiseaseResponse
        fields =  ['prediction', 'probability', 'error', 'error_description']