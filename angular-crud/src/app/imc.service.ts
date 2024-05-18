import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IMC {
  nome: string;
  data_nasc: string;
  cpf: string;
  sexo: string;
  peso: number;
  altura: number;
  imc: number;
}

interface IMCResponse {
  results: IMC[];
}

@Injectable({
  providedIn: 'root'
})
export class ImcService {
  private apiUrl = 'http://127.0.0.1:8000/imc'; // Atualize para o URL correto da sua API

  constructor(private http: HttpClient) { }

  calcularIMC(dados: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, dados);
  }

  listarIMCs(): Observable<IMCResponse> {
    return this.http.get<IMCResponse>(`${this.apiUrl}/`);
  }

  alterarIMC(id: string, dados: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/`, dados);
  }

  deletarIMC(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/`);
  }
}
