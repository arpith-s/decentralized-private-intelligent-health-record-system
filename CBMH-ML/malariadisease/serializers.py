from rest_framework import serializers
from .models import MalariaDiseaseBase, MalariaDiseaseResponse


class MalariaDiseaseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer'''
    class Meta:
        model = MalariaDiseaseBase
        fields = ['image']

class MalariaDiseaseResponseSerializers(serializers.ModelSerializer):
    '''For serializers.ModelSerializer''' 
    class Meta:
        model = MalariaDiseaseResponse
        fields =  ['prediction', 'probability', 'error', 'error_description']