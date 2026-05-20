import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { Emprestimo } from './models/admin.listar.emprestimos.model';
import { AdminListarEmprestimosService } from './services/admin.listar.emprestimos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-listar-emprestimos',
  templateUrl: './admin.listar.emprestimos.component.html',
  styleUrl: './admin.listar.emprestimos.component.scss',
  imports: [ RouterModule, CommonModule, AdminHeader, AdminSidebar, FormsModule ],
})

export class AdminListarEmprestimos implements OnInit {

  protected readonly title = signal('Biblioteca');

  modalAlterarAberto = false;
  modalDeletarAberto = false; 
  
  emprestimoSelecionado!: Emprestimo;

  emprestimos: Emprestimo[] = [];

  emprestimosFiltradas: Emprestimo[] = [];
  emprestimosPaginadas: Emprestimo[] = [];
    
    // Busca
  termoBusca: string = '';

  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(
    private adminListarEmprestimosService: AdminListarEmprestimosService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.buscarEmprestimos();
  }


  buscarEmprestimos(): void {

    this.adminListarEmprestimosService
      .listarEmprestimos()
      .subscribe({

        next: (resposta) => {

          console.log(resposta);

          this.emprestimos = resposta;
          this.emprestimosFiltradas = resposta;
          this.calcularPaginacao();
          this.atualizarPagina();
          this.cdr.detectChanges();
        },

        error: (erro) => {

          console.error(
            'Erro ao buscar empréstimos',
            erro
          );

        }

      });
  }

  salvarAlteracoes(): void {
  
    this.adminListarEmprestimosService
      .atualizarEmprestimo(this.emprestimoSelecionado)
      .subscribe({
  
        next: () => {
          alert('Empréstimo atualizado com sucesso!');
          this.modalAlterarAberto = false;
          this.atualizarPagina();
          this.cdr.detectChanges();
        },
  
        error: (erro) => {
          console.error('Erro ao atualizar empréstimo', erro);
          alert('Erro ao atualizar empréstimo');
        }
      });
  
    this.modalAlterarAberto = false;
  }

  deletarEmprestimo(): void {

    this.adminListarEmprestimosService
      .deletarEmprestimo(this.emprestimoSelecionado.idEmprestimo)
      .subscribe({

        next: () => {

          alert('Empréstimo deletado com sucesso!');

          this.modalDeletarAberto = false;

          this.buscarEmprestimos();
          this.cdr.detectChanges();

        },

        error: (erro) => {

          console.error(
            'Erro ao deletar empréstimo',
            erro
          );

          alert('Erro ao deletar empréstimo');

        }

      });
      
    this.modalDeletarAberto = false;
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();

    this.emprestimosFiltradas = this.emprestimos.filter(emprestimo =>
      emprestimo.tituloLivro?.toLowerCase().includes(termo) ||
      emprestimo.idUsuario.toString().includes(termo)
    );

    this.paginaAtual = 1;
    this.calcularPaginacao();
    this.atualizarPagina();
  }

  calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.emprestimosFiltradas.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.emprestimosPaginadas = this.emprestimosFiltradas.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }
  
    abrirModalAlterar(emprestimo: Emprestimo): void {
      this.emprestimoSelecionado = emprestimo;
      this.modalAlterarAberto = true; 
    }

    abrirModalDeletar(emprestimo: Emprestimo): void {
      this.emprestimoSelecionado = emprestimo;
      this.modalDeletarAberto = true;
    }

}