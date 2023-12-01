from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import HeartDiseaseRequest, HeartDiseaseResponse
from .serializers import HeartDiseaseRequestSerializers, HeartDiseaseResponseSerializers, HeartDiseaseSerializers
from joblib import load
import os
import sys
import crayons as cr
 
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
 
class HeartDisease(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__classes = ['NEGATIVE', 'POSITIVE']
        self.__clf = load('trained_models/heartdisease/heart_rf.joblib')
        self.__attributes = ['age', 'trestbps', 'chol', 'fbs', 'thalach', 'exang', 'oldpeak', 'ca', 'cp_0', 'cp_1',
                             'cp_2', 'cp_3', 'slope_0', 'slope_1', 'slope_2', 'thal_0', 'thal_1', 'thal_2', 'thal_3',
                             'restecg_0', 'restecg_1', 'restecg_2', 'sex_0', 'sex_1']
        self.__prediction_tuple = {key: 0 for key in self.__attributes}
        self.__response_data = {
            'prediction': "",
            'probability': None,
            'error': False,
            'error_description': None
        }

    @swagger_auto_schema(
        operation_description="Predicts General Diseases given symptoms",
        # query_serializer = RealtimeSerializers,
        request_body = HeartDiseaseSerializers,
        responses={201: '```CREATED```', 400: '```BAD_REQUEST```', '': HeartDiseaseResponseSerializers}
    )
    def post(self, request):

        try:
            post_data = request.data

            self.__prediction_tuple['age'] = int(post_data['age'])
            self.__prediction_tuple['trestbps'] = int(post_data['trestbps'])
            self.__prediction_tuple['chol'] = int(post_data['chol'])
            self.__prediction_tuple['fbs'] = int(post_data['fbs'])
            self.__prediction_tuple['thalach'] = int(post_data['thalach'])
            self.__prediction_tuple['exang'] = int(post_data['exang'])
            self.__prediction_tuple['oldpeak'] = float(post_data['oldpeak'])
            self.__prediction_tuple['ca'] = int(post_data['ca'])

            if int(post_data['cp']) == 0:
                self.__prediction_tuple['cp_0'] = 1
            elif int(post_data['cp']) == 1:
                self.__prediction_tuple['cp_1'] = 1
            elif int(post_data['cp']) == 2:
                self.__prediction_tuple['cp_2'] = 1
            elif int(post_data['cp']) == 3:
                self.__prediction_tuple['cp_3'] = 1

            if int(post_data['slope']) == 0:
                self.__prediction_tuple['slope_0'] = 1
            elif int(post_data['slope']) == 1:
                self.__prediction_tuple['slope_1'] = 1
            elif int(post_data['slope']) == 2:
                self.__prediction_tuple['slope_2'] = 1

            if int(post_data['thal']) == 0:
                self.__prediction_tuple['thal_0'] = 1
            elif int(post_data['thal']) == 1:
                self.__prediction_tuple['thal_1'] = 1
            elif int(post_data['thal']) == 2:
                self.__prediction_tuple['thal_2'] = 1
            elif int(post_data['thal']) == 3:
                self.__prediction_tuple['thal_3'] = 1

            if int(post_data['restecg']) == 0:
                self.__prediction_tuple['restecg_0'] = 1
            elif int(post_data['restecg']) == 1:
                self.__prediction_tuple['restecg_1'] = 1
            elif int(post_data['restecg']) == 2:
                self.__prediction_tuple['restecg_2'] = 1

            if int(post_data['sex']) == 0:
                self.__prediction_tuple['sex_0'] = 1
            elif int(post_data['sex']) == 1:
                self.__prediction_tuple['sex_1'] = 1

            # print(cr.red(self.__prediction_tuple))
            prediction = self.__clf.predict(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            probabilities = self.__clf.predict_proba(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            # accuracy = clf.oob_score_

            self.__response_data['prediction'] = str(self.__classes[prediction])
            self.__response_data['probability'] = probabilities[prediction] * 100
 
            self.__prediction_tuple['prediction'] = str(self.__classes[prediction]) 
            request_serializer = HeartDiseaseRequestSerializers(data=self.__prediction_tuple)
            if request_serializer.is_valid():
                pass
                # request_serializer.save()
            else:
                return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            response_serializer = HeartDiseaseResponseSerializers(data=self.__response_data)
            if response_serializer.is_valid():
                # response_serializer.save()
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            return Response(response_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # print(cr.red(str(e)))
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(cr.red(exc_type, fname, exc_tb.tb_lineno))
            self.__response_data['error'] = True
            self.__response_data['error_description'] = str(e) + ' ' + str(exc_type) + ' File' + str(
                fname) + ' Line Number' + str(exc_tb.tb_lineno)

            return Response(self.__response_data)


class HeartDiseaseDetails(APIView):

    @swagger_auto_schema(
    operation_description="Returns Cached values from previous responses",
    responses={200: '```OK```', '': HeartDiseaseRequestSerializers(many=True)}
    )
    def get(self, request):
        data = HeartDiseaseRequest.objects.all()
        serializer = HeartDiseaseRequestSerializers(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Deletes Cached values from previous responses",
        responses={204: '```NO_CONTENT```'}
    )
    def delete(self, request):
        HeartDiseaseRequest.objects.all().delete()
        HeartDiseaseResponse.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)