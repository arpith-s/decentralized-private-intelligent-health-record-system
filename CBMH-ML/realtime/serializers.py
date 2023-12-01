from rest_framework import serializers
from .models import Realtime

class RealtimeSerializers(serializers.ModelSerializer):

    '''For serializers.ModelSerializer'''
    class Meta:
        model = Realtime
        fields =  ['prediction', 'tasks', 'probability', 'error', 'error_description']