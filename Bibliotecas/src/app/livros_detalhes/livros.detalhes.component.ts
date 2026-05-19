import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, switchMap, filter } from 'rxjs';

import { Header } from '../shared/component/header/header.component';
import { LivroDetalhes, LivroAutor } from './models/livros.detalhes.model';
import { LivrosDetalhesService } from './services/livros.detalhes.service';

@Component({
  selector: 'app-livros-detalhes',
  templateUrl: './livros.detalhes.component.html',
  styleUrl: './livros.detalhes.component.scss',
  imports: [RouterModule, CommonModule, Header],
})
export class LivrosDetalhes implements OnInit, OnDestroy {

  livro?: LivroDetalhes;
  livrosAutor: LivroAutor[] = [];

  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private livrosDetalhesService: LivrosDetalhesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params =>
        this.livrosDetalhesService.buscarDetalhes(params['id'])
      )
    ).subscribe({
      next: (dados) => {
        this.livro = dados;
        this.livrosAutor = [];

        const autor = dados.autores?.[0]?.nome;
        if (autor) {
          this.buscarLivrosAutor(autor, dados.titulo);
        }

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar livro', erro);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  buscarLivrosAutor(autor: string, tituloAtual: string): void {
    this.livrosDetalhesService
      .buscarLivrosAutor(autor)
      .subscribe({
        next: (livros) => {
          this.livrosAutor = livros
            .filter(livro => livro.titulo !== tituloAtual)
            .slice(0, 6);

          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao buscar livros do autor', erro);
        }
      });
  }
}