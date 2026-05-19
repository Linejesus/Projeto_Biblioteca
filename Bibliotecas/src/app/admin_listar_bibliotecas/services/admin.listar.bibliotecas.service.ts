import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca } from '../models/admin.listar.bibliotecas.model';

@Injectable({
  providedIn: 'root'
})
export class AdminListarBibliotecasService {

  private apiUrl = 'http://localhost:8080/bibliotecas';

  constructor(private http: HttpClient) {}

  listarBibliotecas(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.apiUrl);
  }

  atualizarBiblioteca(biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.put<Biblioteca>(
      `${this.apiUrl}/${biblioteca.idBiblioteca}`,
      biblioteca
    );
  }

  deletarBiblioteca(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}