import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroCadastro } from '../models/admin.cadastro.livro.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCadastroLivroService {

  private apiUrl = 'http://localhost:8080/livros';

  constructor(
    private http: HttpClient
  ) {}

  cadastrarLivro(livro: LivroCadastro): Observable<any> {
    return this.http.post(this.apiUrl, livro);
  }
}