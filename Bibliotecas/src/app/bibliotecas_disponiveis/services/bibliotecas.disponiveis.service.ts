import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca } from '../models/bibliotecas.disponiveis.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecasDisponiveisService {

  private apiUrl = 'http://localhost:8080/bibliotecas';

  constructor(private http: HttpClient) {}

  listarBibliotecas(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.apiUrl);
  }
}