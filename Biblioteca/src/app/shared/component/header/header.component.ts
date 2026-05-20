import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  protected readonly title = signal('Biblioteca');

  constructor(private router: Router){}

  irParaEmprestimos(){

    const usuario = localStorage.getItem('usuarioLogado');

    if(usuario){

      const usuarioObj = JSON.parse(usuario);

      this.router.navigate([
        '/emprestimos',
        usuarioObj.idUsuario
      ]);
    }
    else {
      // REDIRECIONA PARA CADASTRO
      this.router.navigate(['/cadastro']);
      alert('Faça login para acessar seus empréstimos');
    }
  }
}