from django.db import models


class IMCModel(models.Model):
    imc_id = models.BigAutoField(primary_key=True)
    imc_weight = models.FloatField()
    imc_height = models.FloatField()
    imc_result = models.FloatField()
    imc_user_cpf = models.CharField(max_length=11)
    imc_user_name = models.CharField(max_length=100)
    imc_user_birthday = models.DateField()
    imc_user_sex = models.CharField(max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'IMC: {self.imc_user_cpf}-{self.imc_user_name}-{self.imc_result}'

    class Meta:
        db_table = 'imc'
        verbose_name = 'IMC'
        verbose_name_plural = 'IMCs'
        ordering = ['-created_at']