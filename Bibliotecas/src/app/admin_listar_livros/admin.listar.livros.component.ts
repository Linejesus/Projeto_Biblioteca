import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { Livro } from './models/admin.listar.livros.model';
import { AdminListarLivrosService } from './services/admin.listar.livros.service';

@Component({
  selector: 'app-admin-listar-livros',
  imports: [RouterModule, CommonModule, FormsModule, AdminHeader, AdminSidebar],
  templateUrl: './admin.listar.livros.component.html',
  styleUrl: './admin.listar.livros.component.scss'
})
export class AdminListarLivros implements OnInit {
  protected readonly title = signal('Biblioteca');

  // Modal
  modalAlterarAberto = false;
  livroSelecionado!: Livro;

  // Dados
  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  livrosPaginados: Livro[] = [];

  // Busca
  termoBusca: string = '';

  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(
    private adminListarLivrosService: AdminListarLivrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros(): void {
    this.adminListarLivrosService.listarLivros()
      .subscribe({
        next: (resposta) => {
          this.livros = resposta;
          this.livrosFiltrados = resposta;
          this.calcularPaginacao();
          this.atualizarPagina();
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao buscar livros', erro);
        }
      });
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();

    this.livrosFiltrados = this.livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autores?.[0]?.nome?.toLowerCase().includes(termo)
    );

    this.paginaAtual = 1;
    this.calcularPaginacao();
    this.atualizarPagina();
  }

  calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.livrosFiltrados.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.livrosPaginados = this.livrosFiltrados.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }

  abrirModalAlterar(livro: Livro): void {
    this.livroSelecionado = { ...livro }; // cópia para não alterar o original antes de salvar
    this.modalAlterarAberto = true;
  }

  salvarAlteracoes(): void {
    // chame seu service aqui para salvar
    // this.adminListarLivrosService.atualizar(this.livroSelecionado).subscribe(...)
    this.modalAlterarAberto = false;
  }
}