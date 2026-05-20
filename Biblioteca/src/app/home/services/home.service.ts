import { Injectable } from '@angular/core';
import { LivroHome } from '../models/home.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrlHome = 'http://localhost:8080/livros/home';
  private apiUrlMelhorAvaliados = 'http://localhost:8080/livros/melhor-avaliados';
  private apiUrlRecomendados = 'http://localhost:8080/livros/recomendados';

  constructor(private http: HttpClient) {}

  buscarLivrosHome() {
    return this.http.get<LivroHome[]>(this.apiUrlHome);
  }

  buscarMelhorAvaliados() {
    return this.http.get<LivroHome[]>(this.apiUrlMelhorAvaliados);
  }

  buscarRecomendados(idUsuario: string) {
    return this.http.get<LivroHome[]>(`${this.apiUrlRecomendados}/${idUsuario}`);
  }

}