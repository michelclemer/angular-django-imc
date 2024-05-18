from dataclasses import dataclass


@dataclass
class IMCService:
    def calc_imc(self, weight: float, height: float) -> float:
        return weight / height ** 2

    def get_imc_result(self, imc: float) -> str:
        """Retornar em português a classificação do IMC.

        Args:
            imc (float): _description_

        Returns:
            str: _description_
        """
        if imc < 18.5:
            return 'Magreza'
        elif 18.5 <= imc < 24.9:
            return 'Normal'
        elif 25 <= imc < 29.9:
            return 'Sobrepeso'
        elif 30 <= imc < 39.9:
            return 'Obesidade'
        return 'Obesidade Grave'
