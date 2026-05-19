import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { AdminListarUsuariosService } from './services/admin.listar.usuarios.service';
import { Usuario } from './models/admin.listar.usuarios.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-listar-usuarios',
  templateUrl: './admin.listar.usuarios.component.html',
  styleUrl: './admin.listar.usuarios.component.scss',
  imports: [ RouterModule, CommonModule, AdminHeader, AdminSidebar, FormsModule ],
})

export class AdminListarUsuarios implements OnInit {

  protected readonly title = signal('Biblioteca');

  modalAlterarAberto = false;
  modalDeletarAberto = false;

  usuarioSelecionado!: Usuario;

  usuarios: Usuario[] = [];

  // Dados
    usuariosFiltrados: Usuario[] = [];
    usuariosPaginados: Usuario[] = [];
  
    // Busca
    termoBusca: string = '';
  
    // Paginação
    paginaAtual: number = 1;
    itensPorPagina: number = 5;
    totalPaginas: number = 0;
    paginas: number[] = [];

  constructor(
    private adminListarUsuariosService: AdminListarUsuariosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.buscarUsuarios();

  }

  buscarUsuarios(): void {

    this.adminListarUsuariosService.listarUsuarios()
      .subscribe({

        next: (resposta) => {

          console.log(resposta);

          this.usuarios = resposta;
          this.usuariosFiltrados = resposta;
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

    this.adminListarUsuariosService
      .atualizarUsuario(this.usuarioSelecionado)
      .subscribe({

        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.modalAlterarAberto = false;
          this.buscarUsuarios();
          this.cdr.detectChanges();
        },

        error: (erro) => {
          console.error('Erro ao atualizar usuário', erro);
          alert('Erro ao atualizar usuário');
        }
      });

    this.modalAlterarAberto = false;
  }

  deletarUsuario(): void {

    this.adminListarUsuariosService
      .deletarUsuario(this.usuarioSelecionado.idUsuario)
      .subscribe({

        next: () => {

          alert('Usuário deletado com sucesso!');

          this.modalDeletarAberto = false;

          this.buscarUsuarios();
          this.cdr.detectChanges();

        },

        error: (erro) => {

          console.error(
            'Erro ao deletar usuário',
            erro
          );

          alert('Erro ao deletar usuário');

        }

      });

    this.modalDeletarAberto = false;
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.cpf.includes(termo)
    );

    this.paginaAtual = 1;
    this.calcularPaginacao();
    this.atualizarPagina();
  }

  calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }

  abrirModalAlterar(usuario: Usuario): void {

    this.usuarioSelecionado = usuario;

    this.modalAlterarAberto = true;

  }

  abrirModalDeletar(usuario: Usuario): void {

    this.usuarioSelecionado = usuario;

    this.modalDeletarAberto = true;

  }

}