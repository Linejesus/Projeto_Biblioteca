import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCadastroUsuarioService {

  private http = inject(HttpClient);

  private API = 'http://localhost:8080/usuarios';

  cadastrar(usuario: any): Observable<any> {

    return this.http.post(this.API, usuario);

  }

}