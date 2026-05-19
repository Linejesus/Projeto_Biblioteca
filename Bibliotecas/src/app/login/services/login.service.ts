import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/usuarios/login';

  constructor(private http: HttpClient) {}

  login(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

}