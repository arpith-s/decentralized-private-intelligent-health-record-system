from django.shortcuts import render
from .models import Realtime
from .serializers import RealtimeSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from joblib import load
import os
import sys
import crayons as cr

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.



'''Class Baseed API View'''
class RealtimeAPIView(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__classes = load('trained_models/realtime/classes.joblib')
        self.__clf = load('trained_models/realtime/realtime_nb.joblib')
        self.tasks = load('trained_models/realtime/tasks.joblib')
        self.__attributes = [
            'itching', 'skin_rash', 'nodal_skin_eruptions','continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 
            'acidity', 'ulcers_on_tongue', 'muscle_wasting','vomiting', 'burning_micturition', 'spotting_ urination','fatigue', 'weight_gain', 
            'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 
            'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 
            'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 
            'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 
            'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 
            'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 
            'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 
            'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 
            'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 
            'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 
            'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 
            'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 
            'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 
            'stomach_bleeding', 'distention_of_abdomen','history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 
            'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 
            'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
        ]

        self.__symptoms = {
            "symptoms": self.__attributes
        }

        self.__prediction_tuple = {key: 0 for key in self.__attributes}

        self.__response_data = {
            'prediction': "",
            'tasks': "",
            'probability': None,
            'error': False,
            'error_description': None
        }

    @swagger_auto_schema(
        operation_description="Get Symptoms values",
        # query_serializer = RealtimeSerializers,
        responses={200: '```OK```', '': '```\n{\n \tsymptoms: [string] \n}',}
    )
    def get(self, request):
        return Response(self.__symptoms, status=status.HTTP_200_OK)


    symptoms = openapi.Parameter('symptoms',
                            in_=openapi.IN_QUERY,
                            description='```\n{\n \tsymptoms: [string] \n}',
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Items(type=openapi.TYPE_STRING))
    @swagger_auto_schema(
        operation_description="Predicts General Diseases given symptoms",
        # query_serializer = RealtimeSerializers,
        manual_parameters=[symptoms],
        responses={201: '```CREATED```', 400: '```BAD_REQUEST```', '': RealtimeSerializers}
    )
    def post(self, request):
        
        try:
            post_data = request.data['symptoms']

            for item in post_data:
                if item in self.__prediction_tuple.keys():
                    self.__prediction_tuple[item] = 1

            prediction = self.__clf.predict(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            probabilities = self.__clf.predict_proba(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            # accuracy = clf.oob_score_

            self.__response_data['prediction'] = str(self.__classes[prediction])
            self.__response_data['probability'] = probabilities[prediction] * 100
            self.__response_data['tasks'] = str(",".join(self.tasks[self.__response_data['prediction'].strip()]))
 
            serializer = RealtimeSerializers(data=self.__response_data)

            if serializer.is_valid():
                # serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # print(cr.red(str(e)))
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(cr.red(exc_type, fname, exc_tb.tb_lineno))
            self.__response_data['error'] = True
            self.__response_data['error_description'] = str(e) + ' ' + str(exc_type) + ' File' + str(
                fname) + ' Line Number' + str(exc_tb.tb_lineno)

            return Response(self.__response_data)

class RealtimeDetailAPIView(APIView):

    @swagger_auto_schema(
        operation_description="Returns Cached values from previous responses",
        # query_serializer = RealtimeSerializers,
        responses={200: '```OK```', '': RealtimeSerializers(many=True)}
    )
    def get(self, request):
        data = Realtime.objects.all()
        serializer = RealtimeSerializers(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_description="Deletes Cached values from previous responses",
        responses={204: '```NO_CONTENT```'}
    )
    def delete(self, request):
        Realtime.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
