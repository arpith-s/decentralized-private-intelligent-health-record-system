from rest_framework import serializers
from .models import LiverDiseaseRequest, LiverDiseaseResponse, LiverDisease

class LiverDiseaseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = LiverDisease
        fields = ['age', 'gender', 'total_bilirubin', 'direct_bilirubin', 'alkaline_phosphotase',
                    'alamine_aminotransferase', 'aspartate_aminotransferase', 'total_protiens', 
                    'albumin', 'albumin_and_globulin_ratio']

class LiverDiseaseRequestSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = LiverDiseaseRequest
        fields = ['age', 'gender', 'total_bilirubin', 'direct_bilirubin', 'alkaline_phosphotase',
                    'alamine_aminotransferase', 'aspartate_aminotransferase', 'total_protiens', 
                    'albumin', 'albumin_and_globulin_ratio', 'prediction']

class LiverDiseaseResponseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer''' 
    class Meta:
        model = LiverDiseaseResponse
        fields =  ['prediction', 'probability', 'error', 'error_description']