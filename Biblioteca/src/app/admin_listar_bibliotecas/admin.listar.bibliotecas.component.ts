import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { Biblioteca } from './models/admin.listar.bibliotecas.model';
import { AdminListarBibliotecasService } from './services/admin.listar.bibliotecas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-listar-bibliotecas',
  imports: [RouterModule, CommonModule, AdminHeader, AdminSidebar, FormsModule ],
  templateUrl: './admin.listar.bibliotecas.component.html',
  styleUrl: './admin.listar.bibliotecas.component.scss'
})
export class AdminListarBibliotecas {
  protected readonly title = signal('Biblioteca');

  modalAlterarAberto = false;
  modalDeletarAberto = false;
  
  bibliotecaSelecionada!: Biblioteca;

  bibliotecas: Biblioteca[] = [];
  bibliotecasFiltradas: Biblioteca[] = [];
  bibliotecasPaginadas: Biblioteca[] = [];
  
  // Busca
  termoBusca: string = '';

  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];
  
    constructor(
      private adminListarBibliotecasService: AdminListarBibliotecasService,
      private cdr: ChangeDetectorRef
    ) {}
  
    ngOnInit(): void {
      this.carregarBibliotecas();
    }
  
    carregarBibliotecas(): void {
  
      this.adminListarBibliotecasService
        .listarBibliotecas()
        .subscribe({
  
          next: (dados) => {
            console.log(dados);
            this.bibliotecas = dados;
            this.bibliotecasFiltradas = dados;
            this.calcularPaginacao();
            this.atualizarPagina();
            this.cdr.detectChanges();
          },
  
          error: (erro) => {
            console.error('Erro ao carregar bibliotecas');
            console.error(erro);
          }
  
        });
  
    }

    salvarAlteracoes(): void {

      this.adminListarBibliotecasService
        .atualizarBiblioteca(this.bibliotecaSelecionada)
        .subscribe({

          next: () => {
            alert('Biblioteca atualizada com sucesso!');
            this.modalAlterarAberto = false;
            this.carregarBibliotecas();
          },

          error: (erro) => {
            console.error('Erro ao atualizar biblioteca', erro);
            alert('Erro ao atualizar biblioteca');
          }
        });

      this.modalAlterarAberto = false;
    }

    deletarBiblioteca(): void {

      this.adminListarBibliotecasService
        .deletarBiblioteca(this.bibliotecaSelecionada.idBiblioteca)
        .subscribe({

          next: () => {

            alert('Biblioteca deletada com sucesso!');
            this.modalDeletarAberto = false;
            this.carregarBibliotecas();

          },

          error: (erro) => {

            console.error(
              'Erro ao deletar biblioteca',
              erro
            );

            alert('Erro ao deletar biblioteca');

          }

        });

      this.modalDeletarAberto = false;
    }

    filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();

    this.bibliotecasFiltradas = this.bibliotecas.filter(biblioteca =>
      biblioteca.nome.toLowerCase().includes(termo) ||
      biblioteca.cidade?.toLowerCase().includes(termo)
    );

    this.paginaAtual = 1;
    this.calcularPaginacao();
    this.atualizarPagina();
  }

  calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.bibliotecasFiltradas.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.bibliotecasPaginadas = this.bibliotecasFiltradas.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }

    abrirModalAlterar(biblioteca: Biblioteca): void {
    
      this.bibliotecaSelecionada = biblioteca;
      this.modalAlterarAberto = true;
    
    }

    abrirModalDeletar(biblioteca: Biblioteca): void {
    
      this.bibliotecaSelecionada = biblioteca;
      this.modalDeletarAberto = true;
    
    }
}