from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import LiverDiseaseRequest, LiverDiseaseResponse
from .serializers import LiverDiseaseRequestSerializers, LiverDiseaseResponseSerializers, LiverDiseaseSerializers
from joblib import load
import os 
import sys
import crayons as cr

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class LiverDisease(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__classes = ['0', 'POSITIVE', 'NEGATIVE']
        self.__clf = load('trained_models/liver/liver_disease.joblib')
        self.__attributes = ['age', 'gender', 'total_bilirubin', 'direct_bilirubin', 'alkaline_phosphotase',
                            'alamine_aminotransferase', 'aspartate_aminotransferase', 'total_protiens', 
                            'albumin', 'albumin_and_globulin_ratio']
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
        request_body = LiverDiseaseSerializers,
        responses={201: '```CREATED```', 400: '```BAD_REQUEST```', '': LiverDiseaseResponseSerializers}
    )
    def post(self, request):
        try:
            post_data = request.data

            for input_key in post_data.keys():
                input_key = str(input_key)
                if "gender" == input_key:
                    if str(post_data[input_key]).lower() == "male":
                        self.__prediction_tuple[input_key] = 1.0
                    elif str(post_data[input_key]).lower() == "female":
                        self.__prediction_tuple[input_key] = 0.0
                else:
                    self.__prediction_tuple[input_key] = float(post_data[input_key])

            prediction = self.__clf.predict(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            probabilities = self.__clf.predict_proba(
                [[self.__prediction_tuple[x] for x in self.__attributes]])[0]
            # accuracy = clf.oob_score_

            self.__response_data['prediction'] = str(self.__classes[prediction])
            self.__response_data['probability'] = probabilities[prediction - 1] * 100

            self.__prediction_tuple['prediction'] = str(self.__classes[prediction]) 
            request_serializer = LiverDiseaseRequestSerializers(data=self.__prediction_tuple)
            if request_serializer.is_valid():
                pass
                # request_serializer.save()
            else:
                return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            response_serializer = LiverDiseaseResponseSerializers(data=self.__response_data)
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

class LiverDiseaseDetails(APIView):

    @swagger_auto_schema(
    operation_description="Returns Cached values from previous responses",
    responses={200: '```OK```', '': LiverDiseaseResponseSerializers(many=True)}
    )
    def get(self, request):
        data = LiverDiseaseRequest.objects.all()
        serializer = LiverDiseaseRequestSerializers(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Deletes Cached values from previous responses",
        responses={204: '```NO_CONTENT```'}
    )
    def delete(self, request):
        LiverDiseaseRequest.objects.all().delete()
        LiverDiseaseResponse.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)