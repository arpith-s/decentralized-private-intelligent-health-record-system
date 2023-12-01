from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import KidneyDiseaseRequest, KidneyDiseaseResponse
from .serializers import KidneyDiseaseRequestSerializers, KidneyDiseaseResponseSerializers, KidneyDiseaseSerializers
from joblib import load
import os
import sys
import crayons as cr

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class KidneyDisease(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__classes = ['NEGATIVE', 'POSITIVE']
        self.__clf = load('trained_models/kidneydisease/chronic_kidney_disease.joblib')
        self.__attributes = ['age', 'bp', 'sg', 'al', 'su', 'rbc', 'pc', 'pcc', 'ba', 'bgr', 'bu', 'sc', 'sod', 'pot',
                             'hemo', 'pcv', 'wc', 'rc', 'htn', 'dm', 'cad', 'appet', 'pe', 'ane']
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
        request_body = KidneyDiseaseSerializers,
        responses={201: '```CREATED```', 400: '```BAD_REQUEST```', '': KidneyDiseaseResponseSerializers}
    )
    def post(self, request):

        try:
            post_data = request.data

            for input_key in post_data.keys():
                input_key = str(input_key)
                if "age" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "bp" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "sg" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "al" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "su" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "rbc" == input_key or "pc" == input_key:
                    if str(post_data[input_key]) == "abnormal":
                        self.__prediction_tuple[input_key] = 1.0
                    elif str(post_data[input_key]) == "normal":
                        self.__prediction_tuple[input_key] = 0.0
                elif "pcc" == input_key or "ba" == input_key:
                    if str(post_data[input_key]) == "present":
                        self.__prediction_tuple[input_key] = 1.0
                    elif str(post_data[input_key]) == "notpresent":
                        self.__prediction_tuple[input_key] = 0.0
                elif "bgr" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "bu" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "sc" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "sod" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "pot" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "hemo" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "pcv" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "wc" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif "rc" == input_key:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])
                elif 'htn' == input_key or 'dm' == input_key or 'cad' == input_key or 'pe' == input_key \
                        or 'ane' == input_key:
                    if str(post_data[input_key]) == "yes":
                        self.__prediction_tuple[input_key] = 1.0
                    elif str(post_data[input_key]) == "no":
                        self.__prediction_tuple[input_key] = 0.0
                elif "appet" == input_key:
                    if str(post_data[input_key]) == "good":
                        self.__prediction_tuple[input_key] = 1.0
                    elif str(post_data[input_key]) == "poor":
                        self.__prediction_tuple[input_key] = 0.0

            prediction = self.__clf.predict(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            probabilities = self.__clf.predict_proba(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            # accuracy = clf.oob_score_

            self.__response_data['prediction'] = str(self.__classes[prediction])
            self.__response_data['probability'] = probabilities[prediction] * 100

            self.__prediction_tuple['prediction'] = str(self.__classes[prediction]) 
            request_serializer = KidneyDiseaseRequestSerializers(data=self.__prediction_tuple)
            if request_serializer.is_valid():
                pass
                # request_serializer.save()
            else:
                return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            response_serializer = KidneyDiseaseResponseSerializers(data=self.__response_data)
            if response_serializer.is_valid():
                # response_serializer.save()
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            return Response(response_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            print(cr.red(str(e)))
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(cr.red(exc_type, fname, exc_tb.tb_lineno))

            self.__response_data['error'] = True
            self.__response_data['error_description'] = str(e) + ' ' + str(exc_type) + ' File' + str(
                fname) + ' Line Number' + str(exc_tb.tb_lineno)

            return Response(self.__response_data)

class KidneyDiseaseDetails(APIView):
 
    @swagger_auto_schema(
    operation_description="Returns Cached values from previous responses",
    responses={200: '```OK```', '': KidneyDiseaseRequestSerializers(many=True)}
    )
    def get(self, request):
        data = KidneyDiseaseRequest.objects.all()
        serializer = KidneyDiseaseRequestSerializers(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Deletes Cached values from previous responses",
        responses={204: '```NO_CONTENT```'}
    )
    def delete(self, request):
        KidneyDiseaseRequest.objects.all().delete()
        KidneyDiseaseResponse.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)