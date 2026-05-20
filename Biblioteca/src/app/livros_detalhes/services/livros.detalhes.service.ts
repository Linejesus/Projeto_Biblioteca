import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LivroAutor, LivroDetalhes } from '../models/livros.detalhes.model';

@Injectable({
  providedIn: 'root'
})
export class LivrosDetalhesService {

  private apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  buscarDetalhes(id: string){
    return this.http.get<LivroDetalhes>(
      `${this.apiUrl}/detalhes/${id}`
    );
  }

  buscarLivrosAutor(autor: string){
    return this.http.get<LivroAutor[]>(
      `${this.apiUrl}/autor/${autor}`
    );
  }
  
}