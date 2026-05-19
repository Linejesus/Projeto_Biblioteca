import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../shared/component/header/header.component';
import { EmprestimosService } from './services/emprestimos.service';
import { MeusEmprestimos } from './models/emprestimos.model';

@Component({
  selector: 'app-emprestimos',
  standalone: true,
  imports: [ RouterModule, CommonModule, HttpClientModule, Header],
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.scss'
})
export class Emprestimos implements OnInit {

  emprestimos: MeusEmprestimos[] = [];

  constructor(private emprestimosService: EmprestimosService) {}

  ngOnInit(): void {

    const idUsuario = 8;

    this.emprestimosService
      .listarMeusEmprestimos(idUsuario)
      .subscribe({

        next: (resposta) => {

          console.log(resposta);

          this.emprestimos = resposta;

        },

        error: (erro) => {

          console.error('Erro ao buscar empréstimos');

          console.error(erro);

        }

      });

  }

}