import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../shared/component/header/header.component';

import { BibliotecasDisponiveisService } from './services/bibliotecas.disponiveis.service';
import { Biblioteca } from './models/bibliotecas.disponiveis.model';

@Component({
  selector: 'app-bibliotecas-disponiveis',
  imports: [RouterModule, CommonModule, Header, HttpClientModule],
  templateUrl: './bibliotecas.disponiveis.component.html',
  styleUrl: './bibliotecas.disponiveis.component.scss'
})
export class BibliotecasDisponiveis implements OnInit {

  protected readonly title = signal('Biblioteca');

  bibliotecas: Biblioteca[] = [];

  constructor(
    private bibliotecasDisponiveisService: BibliotecasDisponiveisService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarBibliotecas();
  }

  carregarBibliotecas(): void {

    this.bibliotecasDisponiveisService
      .listarBibliotecas()
      .subscribe({

        next: (dados) => {
          console.log(dados);
          this.bibliotecas = dados;
          this.cdr.detectChanges();
        },

        error: (erro) => {
          console.error('Erro ao carregar bibliotecas');
          console.error(erro);
        }

      });

  }

}
