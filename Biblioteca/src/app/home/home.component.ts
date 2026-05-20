import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/component/header/header.component';
import { HomeService } from './services/home.service';
import { LivroHome } from './models/home.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterModule, CommonModule, Header],
})
export class Home implements OnInit {

  livrosHome: LivroHome[] = [];

  melhoresAvaliados: LivroHome[] = [];

  livrosRecomendados: LivroHome[] = [];

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const idUsuario =
    localStorage.getItem('idUsuario');

    console.log('ID usuário:', idUsuario);

    this.carregarLivrosHome();

    this.carregarMelhoresAvaliados();

    if(idUsuario){
      this.carregarRecomendados(idUsuario);
    }
  }

  carregarLivrosHome() {

    this.homeService.buscarLivrosHome()
      .subscribe({
        next: (dados) => {
          this.livrosHome = dados;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

  carregarMelhoresAvaliados() {

    this.homeService.buscarMelhorAvaliados()
      .subscribe({
        next: (dados) => {
          this.melhoresAvaliados = dados;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

  carregarRecomendados(idUsuario: string) {
    
    this.homeService
      .buscarRecomendados(idUsuario)
      .subscribe({

        next: (dados) => {

          this.livrosRecomendados = dados;

          this.cdr.detectChanges();

        },

        error: (erro) => {

          console.error(
            'Erro ao carregar recomendações',
            erro
          );
        }
      });
  }

}