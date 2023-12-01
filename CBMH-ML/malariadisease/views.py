from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# from keras.models import load_model
from .serializers import MalariaDiseaseSerializers, MalariaDiseaseResponseSerializers
from .models import MalariaDiseaseBase
from django.conf import settings
import numpy as np
import cv2
from PIL import Image
import crayons as cr
import sys
import os
# from joblib import load
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import codecs

np.random.seed(10)

class MalariaDisease(APIView):
    # parser_class = (FileUploadParser,)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        model_name = 'malaria/malariadisease.joblib'
        # self.loaded_model = load(os.path.join(settings.MODEL_ROOT, model_name))
        self.__classes = ['POSITIVE', 'NEGATIVE']
        self.__response_data = {
            'prediction': "",
            'probability': None,
            'error': False,
            'error_description': None
        }

    @swagger_auto_schema(
    operation_description="Predicts General Diseases given symptoms",
    request_body = MalariaDiseaseSerializers,
    responses={201: '```CREATED```', 400: '```BAD_REQUEST```', '': MalariaDiseaseResponseSerializers}
    )
    def post(self, request):
        # image_serializer = MalariaDiseaseSerializers(data=request.data)
        # if image_serializer.is_valid():
        #     print(np.array(codecs.encode(request.FILES["image"].read())))

        # try:
        #     image_serializer = MalariaDiseaseSerializers(data=request.data)

        #     if image_serializer.is_valid():
        #         # image_serializer.save()
                
        #         image = cv2.imread("media/"+str(request.FILES['image']))
        #         image_array = Image.fromarray(image , 'RGB')
        #         resize_img = image_array.resize((50 , 50))
        #         resize_img = np.array(resize_img).reshape(1,50,50,3)/255.

        #         __prediction = self.loaded_model.predict(resize_img)
        #         index = np.argmax(__prediction)
        #         self.__response_data['prediction'] = self.__classes[index]
        #         self.__response_data['probability'] = __prediction[0][index] 

        #         return Response(self.__response_data, status=status.HTTP_201_CREATED)
        #     return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # except Exception as e:
        #     print(cr.red(str(e)))
        #     exc_type, exc_obj, exc_tb = sys.exc_info()
        #     fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        #     print(cr.red(exc_type, fname, exc_tb.tb_lineno))

        #     self.__response_data['error'] = True
        #     self.__response_data['error_description'] = str(e) + ' ' + str(exc_type) + ' File' + str(
        #         fname) + ' Line Number' + str(exc_tb.tb_lineno)

        #     return Response(self.__response_data, status=status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_409_CONFLICT, status=status.HTTP_409_CONFLICT)

# class MalariaDiseaseDetails(APIView):

#     @swagger_auto_schema(
#     operation_description="Deletes Cached values from previous responses",
#     responses={204: '```NO_CONTENT```'}
#     )
#     def delete(self, request):
#         try:
#             for file in os.listdir(settings.MEDIA_ROOT):
#                 os.remove(settings.MEDIA_ROOT+'/'+file)
#             MalariaDiseaseBase.objects.all().delete()
#         except Exception as e:
#             print(str(e))
#         return Response(status=status.HTTP_204_NO_CONTENT)