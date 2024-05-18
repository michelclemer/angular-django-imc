from rest_framework import serializers

from .models import IMCModel
from .services import IMCService


class IMCSerializer(serializers.ModelSerializer):
    info_imc = serializers.SerializerMethodField()
    class Meta:
        model = IMCModel
        fields = '__all__'
        read_only_fields = ['imc_id', 'created_at', 'updated_at']

    def get_info_imc(self, obj):
        service = IMCService()
        return service.get_imc_result(obj.imc_result)
