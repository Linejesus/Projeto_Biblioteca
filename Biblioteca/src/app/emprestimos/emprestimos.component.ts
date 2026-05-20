import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../shared/component/header/header.component';
import { EmprestimosService } from './services/emprestimos.service';
import { MeusEmprestimos } from './models/emprestimos.model';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-emprestimos',
  standalone: true,
  imports: [ RouterModule, CommonModule, HttpClientModule, Header],
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.scss'
})
export class Emprestimos implements OnInit {

  emprestimos: MeusEmprestimos[] = [];

  constructor(
  private emprestimosService: EmprestimosService,
  private route: ActivatedRoute,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    const idUsuario =
      this.route.snapshot.paramMap.get('id');

    if(idUsuario){

      this.carregarEmprestimos(idUsuario);

    }
  }

  carregarEmprestimos(idUsuario: string): void {

    this.emprestimosService
      .listarMeusEmprestimos(idUsuario)
      .subscribe({

        next: (dados) => {

          console.log(dados);

          this.emprestimos = dados;

          this.cdr.detectChanges();
        },

        error: (erro) => {

          console.error(
            'Erro ao carregar empréstimos',
            erro
          );
        }
      });
  }

  renovarEmprestimo(idEmprestimo: number): void {

    this.emprestimosService
      .renovarEmprestimo(idEmprestimo)
      .subscribe({

        next: () => {

          alert('Empréstimo renovado com sucesso!');

          const idUsuario =
            this.route.snapshot.paramMap.get('id');

          if(idUsuario){

            this.carregarEmprestimos(idUsuario);

          }

          this.cdr.detectChanges();

        },

        error: (erro) => {

          console.error(
            'Erro ao renovar empréstimo',
            erro
          );
        }
      });
  }
}