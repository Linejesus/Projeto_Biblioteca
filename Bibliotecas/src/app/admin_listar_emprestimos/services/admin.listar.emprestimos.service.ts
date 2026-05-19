import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/admin.listar.emprestimos.model';

@Injectable({
  providedIn: 'root'
})
export class AdminListarEmprestimosService {

  private apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

  listarEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  atualizarEmprestimo(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(
      `${this.apiUrl}/${emprestimo.idEmprestimo}`,
      emprestimo
    );
  }

  deletarEmprestimo(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  atualizarDevolucao(id: number, dataDevolucaoReal: string): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(
      `${this.apiUrl}/${id}/devolucao`,
      { dataDevolucaoReal }
    );
  }
}