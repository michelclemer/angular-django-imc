from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import ModelViewSet

from .models import IMCModel
from .serializers import IMCSerializer
from .services import IMCService


class IMCViewSet(ModelViewSet):
    queryset = IMCModel.objects.all()
    serializer_class = IMCSerializer
    service_class = IMCService
    http_method_names = ['get', 'post', 'patch', 'delete']
    lookup_field = 'imc_id'
    lookup_url_kwarg = 'imc_id'
    filterset_fields = ['imc_user_cpf', 'imc_user_name', 'imc_user_birthdate', 'imc_user']
    ordering_fields = ['imc_result', 'created_at', 'updated_at']

    def create(self, request, *args, **kwargs):
        data = request.data

        weight = data.get('imc_weight')
        height = data.get('imc_height')
        imc = self.service_class().calc_imc(weight, height)
        request.data['imc_result'] = imc
        return super().create(request, *args, **kwargs)
