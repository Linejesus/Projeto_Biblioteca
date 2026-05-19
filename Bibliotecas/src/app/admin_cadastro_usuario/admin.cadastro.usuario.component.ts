import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminCadastroUsuarioService } from './services/admin.cadastro.usuario.service';

@Component({
  selector: 'app-admin-cadastro-usuario',
  imports: [RouterModule, CommonModule, AdminHeader, AdminSidebar, ReactiveFormsModule ],
  templateUrl: './admin.cadastro.usuario.component.html',
  styleUrl: './admin.cadastro.usuario.component.scss'
})
export class AdminCadastroUsuario implements OnInit {
  protected readonly title = signal('Biblioteca');

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCadastroUsuarioService: AdminCadastroUsuarioService
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  
  public get nomeInvalido() : boolean {
    
    let nome = this.cadastroForm.get('nome');

    if(nome !== null && nome.invalid && nome.touched){
      return true;
    }

    return false;
  }

  public get cpfInvalido() : boolean {
    
    let cpf = this.cadastroForm.get('cpf');

    if(cpf !== null && cpf.invalid && cpf.touched){
      return true;
    }
    
    return false;
  }

  public get emailInvalido() : boolean {
    
    let email = this.cadastroForm.get('email');

    if(email !== null && email.invalid && email.touched){
      return true;
    }
    
    return false;
  }

  public get senhaInvalida() : boolean {
    
    let senha = this.cadastroForm.get('senha');

    if(senha !== null && senha.invalid && senha.touched){
      return true;
    }
    
    return false;
  }
  

  public cadastrar(): void {

    if(this.cadastroForm.invalid){

      this.cadastroForm.markAllAsTouched();

      return;
    }

    this.adminCadastroUsuarioService
      .cadastrar(this.cadastroForm.value)
      .subscribe({

        next: (resposta) => {

          console.log('Usuário cadastrado com sucesso!');
          console.log(resposta);

        },

        error: (erro) => {

          console.error('Erro ao cadastrar usuário!');
          console.error(erro);

        }

      });

  }


  ngOnInit(): void {
    
  }
}
