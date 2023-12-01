from rest_framework import serializers
from .models import HeartDiseaseRequest, HeartDiseaseResponse, HeartDisease



class HeartDiseaseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = HeartDisease
        fields = ['age', 'sex','cp','trestbps','chol','fbs','restecg','thalach','exang','oldpeak','slope','ca','thal']

class HeartDiseaseRequestSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = HeartDiseaseRequest
        fields =  ['age', 'trestbps', 'chol', 'fbs', 'thalach', 'exang', 'oldpeak', 'ca', 'cp_0', 'cp_1',
                    'cp_2', 'cp_3', 'slope_0', 'slope_1', 'slope_2', 'thal_0', 'thal_1', 'thal_2', 'thal_3',
                    'restecg_0', 'restecg_1', 'restecg_2', 'sex_0', 'sex_1', 'prediction']
 
class HeartDiseaseResponseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = HeartDiseaseResponse
        fields =  ['prediction', 'probability', 'error', 'error_description']

