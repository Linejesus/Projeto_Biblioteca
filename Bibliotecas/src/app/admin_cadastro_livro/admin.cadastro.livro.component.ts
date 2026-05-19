import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';

import { AdminCadastroLivroService } from './services/admin.cadastro.livro.service';

@Component({
  selector: 'app-admin-cadastro-livro',
  standalone: true,
  imports: [ RouterModule, CommonModule, FormsModule, AdminHeader, AdminSidebar ],
  templateUrl: './admin.cadastro.livro.component.html',
  styleUrl: './admin.cadastro.livro.component.scss'
})
export class AdminCadastroLivro {

  protected readonly title = signal('Biblioteca');

  livro = {

    idBiblioteca: 1,

    titulo: '',
    anoPublicacao: null,

    autores: [
      {
        nome: '',
        nacionalidade: ''
      }
    ],

    generos: '',

    editoras: [
      {
        nome: '',
        pais: ''
      }
    ],

    edicoes: [
      {
        edicao: null,
        ano: null
      }
    ],

    tags: '',

    avaliacaoMedia: null,
    numeroPaginas: null,
    idioma: '',
    capa: ''

  };

  constructor(
    private adminCadastroLivroService: AdminCadastroLivroService
  ) {}

  salvarLivro(): void {

    const payload = {

      ...this.livro,

      generos: this.livro.generos
        .split(',')
        .map(genero => genero.trim())
        .filter(genero => genero.length > 0),

      tags: this.livro.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),

      autores: this.livro.autores.map(autor => ({
        nome: autor.nome,
        nacionalidade: autor.nacionalidade || 'Não informado'
      })),

      editoras: this.livro.editoras.map(editora => ({
        nome: editora.nome,
        pais: editora.pais || 'Não informado'
      })),

      idioma: this.livro.idioma || 'Não informado'

    };

    console.log(payload);

    this.adminCadastroLivroService
      .cadastrarLivro(payload)
      .subscribe({

        next: (resposta) => {

          console.log('Livro cadastrado', resposta);

          alert('Livro cadastrado com sucesso!');

        },

        error: (erro) => {

          console.error('Erro ao cadastrar livro', erro);

        }

      });

  }

  adicionarAutor(): void {

    this.livro.autores.push({
      nome: '',
      nacionalidade: ''
    });

  }

  removerAutor(index: number): void {

    this.livro.autores.splice(index, 1);

  }

  adicionarEditora(): void {

    this.livro.editoras.push({
      nome: '',
      pais: ''
    });

  }

  removerEditora(index: number): void {

    this.livro.editoras.splice(index, 1);

  }

  adicionarEdicao(): void {

    this.livro.edicoes.push({
      edicao: null,
      ano: null
    });

  }

  removerEdicao(index: number): void {

    this.livro.edicoes.splice(index, 1);

  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.livro.capa = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

}