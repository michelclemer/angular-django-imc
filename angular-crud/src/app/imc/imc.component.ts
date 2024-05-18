import { Component, OnInit } from '@angular/core';
import { ImcService } from '../imc.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'form-imc',
  templateUrl: './imc.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    HttpClientModule
  ],
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {
  nome: string = '';
  data_nasc: string = '';
  cpf: string = '';
  sexo: string = '';
  peso: number | null = null;
  altura: number | null = null;
  resultado: number | null = null;
  filtro: string = '';
  imcs: any[] = [];
  editando: boolean = false;
  idEditando: string | null = null;

  constructor(private imcService: ImcService) { }

  ngOnInit(): void {
    this.listarIMCs();
  }

  calcular(): void {
    const dados = {
      imc_user_name: this.nome,
      data_nasc: this.data_nasc,
      imc_user_cpf: this.cpf,
      imc_user_sex: this.sexo == "Masculino" ? "M" : "F",
      imc_weight: this.peso,
      imc_height: this.altura,
      imc_user_birthday: this.data_nasc
    };

    if (this.editando) {
      this.imcService.alterarIMC(this.idEditando!, dados).subscribe(response => { // Adicione o operador !
        this.resultado = response.imc;
        this.listarIMCs();
        this.limparFormulario();
      }, error => {
        console.error('Erro ao alterar IMC', error);
      });
    } else {
      this.imcService.calcularIMC(dados).subscribe(response => {
        this.resultado = response.imc;
        this.listarIMCs();
        this.limparFormulario();
      }, error => {
        console.error('Erro ao calcular IMC', error);
      });
    }
  }

  listarIMCs(): void {
    this.imcService.listarIMCs().subscribe(response => {
      console.log(response, "res");
      this.imcs = response.results;
    }, error => {
      console.error('Erro ao listar IMCs', error);
    });
  }

  filtrarIMCs(): any[] {
    return this.imcs.filter(imc =>
      imc.imc_user_name.toLowerCase().includes(this.filtro.toLowerCase()) ||
      imc.imc_user_cpf.includes(this.filtro)
    );
  }

  editar(imc: any): void {
    this.editando = true;
    this.idEditando = imc.imc_id; // Supondo que cada IMC tem um ID único
    this.nome = imc.imc_user_name;
    this.data_nasc = imc.imc_user_birthday;
    this.cpf = imc.imc_user_cpf;
    this.sexo = imc.imc_user_sex == "M" ? "Masculino" : "Feminino";
    this.peso = imc.imc_weight;
    this.altura = imc.imc_height;
    this.resultado = imc.imc_result;
  }

  deletar(imc: any): void {
    this.imcService.deletarIMC(imc.imc_id).subscribe(response => {
      this.listarIMCs();
    }, error => {
      console.error('Erro ao deletar IMC', error);
    });
  }

  limparFormulario(): void {
    this.editando = false;
    this.idEditando = null;
    this.nome = '';
    this.data_nasc = '';
    this.cpf = '';
    this.sexo = '';
    this.peso = null;
    this.altura = null;
    this.resultado = null;
  }
}
