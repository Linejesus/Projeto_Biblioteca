import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { AdminListarMultasService } from './services/admin.listar.multas.services';
import { Multa } from './models/admin.listar.multa.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-listar-multas',
  imports: [ RouterModule, CommonModule, AdminHeader, AdminSidebar, FormsModule ],
  templateUrl: './admin-listar-multas.html',
  styleUrl: './admin-listar-multas.scss',
})
export class AdminListarMultas {
  protected readonly title = signal('Biblioteca');
  
    modalAlterarAberto = false;
    modalDeletarAberto = false;

    multas: Multa[] = [];

    multaSelecionada!: Multa;

    // Dados
    multasFiltradas: Multa[] = [];
    multasPaginadas: Multa[] = [];
  
    // Busca
    termoBusca: string = '';
  
    // Paginação
    paginaAtual: number = 1;
    itensPorPagina: number = 5;
    totalPaginas: number = 0;
    paginas: number[] = [];
  
    constructor(
      private adminListarMultasService: AdminListarMultasService,
      private cdr: ChangeDetectorRef
    ) {}
  
    ngOnInit(): void {
  
      this.buscarMultas();
  
    }
  
    buscarMultas(): void {
  
      this.adminListarMultasService.listarMultas()
        .subscribe({
  
          next: (resposta) => {
  
            console.log(resposta);
  
            this.multas = resposta;
            this.multasFiltradas = resposta;
            this.calcularPaginacao();
            this.atualizarPagina();
            this.cdr.detectChanges();
  
          },
  
          error: (erro) => {
  
            console.error('Erro ao buscar usuários', erro);
  
          }
  
        });
    }
  
    salvarAlteracoes(): void {
  
      this.adminListarMultasService
        .atualizarMulta(this.multaSelecionada)
        .subscribe({
  
          next: () => {
            alert('Multa atualizada com sucesso!');
            this.modalAlterarAberto = false;
            this.buscarMultas();
            this.cdr.detectChanges();
          },
  
          error: (erro) => {
            console.error('Erro ao atualizar multa', erro);
            alert('Multa já esta paga');
          }
        });
  
      this.modalAlterarAberto = false;
    }

    filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();

    this.multasFiltradas = this.multas.filter(multa =>
      multa.dataMulta.toLowerCase().includes(termo) ||
      multa.idMulta?.toString().includes(termo)
    );

    this.paginaAtual = 1;
    this.calcularPaginacao();
    this.atualizarPagina();
  }

  calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.multasFiltradas.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.multasPaginadas = this.multasFiltradas.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }
  
  
    abrirModalAlterar(multa: Multa): void {
  
      this.multaSelecionada = multa;
  
      this.modalAlterarAberto = true;
  
    }

}
