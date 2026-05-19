import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCadastroEmprestimoService {

  private http = inject(HttpClient);

  private API = 'http://localhost:8080/emprestimos';

  cadastrar(emprestimo: any): Observable<any> {

    return this.http.post(this.API, emprestimo);

  }

}