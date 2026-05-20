import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeusEmprestimos } from '../models/emprestimos.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  private apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

  listarMeusEmprestimos(idUsuario: string){
    return this.http.get<MeusEmprestimos[]>(
      `${this.apiUrl}/usuario/${idUsuario}`
    );
  }

  renovarEmprestimo(idEmprestimo: number) {
    return this.http.put(
      `${this.apiUrl}/${idEmprestimo}/renovar`,
      {}
    );

  }

}