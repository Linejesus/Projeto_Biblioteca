import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/admin.listar.livros.model';

@Injectable({
  providedIn: 'root'
})
export class AdminListarLivrosService {

  private apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  listarLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  alterarLivro(id: string, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(
      `${this.apiUrl}/${id}`,
      livro
    );
  }

  deletarLivro(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}