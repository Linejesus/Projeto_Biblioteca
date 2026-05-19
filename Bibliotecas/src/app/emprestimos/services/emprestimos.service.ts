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

  listarMeusEmprestimos(idUsuario: number): Observable<MeusEmprestimos[]> {

    return this.http.get<MeusEmprestimos[]>(
      `${this.apiUrl}/${idUsuario}`
    );

  }

}