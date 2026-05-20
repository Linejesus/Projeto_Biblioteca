import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCadastroBibliotecaService {

  private http = inject(HttpClient);

  private API = 'http://localhost:8080/bibliotecas';

  cadastrar(biblioteca: any): Observable<any> {

    return this.http.post(this.API, biblioteca);

  }

}