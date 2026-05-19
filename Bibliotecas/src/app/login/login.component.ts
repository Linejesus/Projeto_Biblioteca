import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {

  email = '';
  senha = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {

    // ADMIN
    if (this.email === 'biblioteca@gmail.com' && this.senha === 'adm') {
      this.router.navigate(['/admin']);
      return;
    }

    // USUÁRIO NORMAL
    this.loginService.login({ 
      email: this.email,
      senha: this.senha
    }).subscribe({

      next: (usuario) => {

        console.log(usuario);

        this.router.navigate(['/home']);

      },

      error: (erro) => {

        alert('Email ou senha inválidos');

        console.log(erro);

      }

    });

  }

}