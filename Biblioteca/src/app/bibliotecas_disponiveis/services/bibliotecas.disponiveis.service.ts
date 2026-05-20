import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca } from '../models/bibliotecas.disponiveis.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecasDisponiveisService {

  private apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  buscarBibliotecasLivro(
    titulo: string
  ): Observable<Biblioteca[]> {

    const params = new HttpParams()
      .set('titulo', titulo);

    return this.http.get<Biblioteca[]>(
      `${this.apiUrl}/bibliotecas`,
      { params }
    );
  }
}