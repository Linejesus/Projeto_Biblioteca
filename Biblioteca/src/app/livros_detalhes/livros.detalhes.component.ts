import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../shared/component/header/header.component';
import { LivroDetalhes, LivroAutor } from './models/livros.detalhes.model';
import { LivrosDetalhesService } from './services/livros.detalhes.service';

@Component({
  selector: 'app-livros-detalhes',
  templateUrl: './livros.detalhes.component.html',
  styleUrl: './livros.detalhes.component.scss',
  imports: [ RouterModule, CommonModule, Header ],
})

export class LivrosDetalhes implements OnInit {

  livro?: LivroDetalhes;

  livrosAutor: LivroAutor[] = [];

  constructor(
    private route: ActivatedRoute,
    private livrosDetalhesService: LivrosDetalhesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){

      this.livrosDetalhesService
        .buscarDetalhes(id)
        .subscribe({

          next: (dados) => {

            this.livro = dados;

            this.cdr.detectChanges();

            const autor =
              dados.autores?.[0]?.nome;

            if(autor){

              this.buscarLivrosAutor(
                autor,
                dados.titulo
              );
            }
          },

          error: (erro) => {

            console.error(
              'Erro ao buscar livro',
              erro
            );
          }
        });
    }
  }

  buscarLivrosAutor(
    autor: string,
    tituloAtual: string
  ){

    this.livrosDetalhesService
      .buscarLivrosAutor(autor)
      .subscribe({

        next: (livros) => {

          this.livrosAutor =
            livros
              .filter(
                livro =>
                  livro.titulo !== tituloAtual
              )
              .slice(0, 6);
          
          this.cdr.detectChanges();
        },

        error: (erro) => {

          console.error(
            'Erro ao buscar livros do autor',
            erro
          );
        }
      });
  }
}