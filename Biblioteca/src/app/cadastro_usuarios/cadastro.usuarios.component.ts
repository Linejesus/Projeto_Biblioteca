import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { CadastroUsuariosService } from './services/cadastro.usuarios.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro.usuarios.component.html',
  styleUrls: ['./cadastro.usuarios.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
})
export class CadastroUsuarios implements OnInit {
  //protected readonly title = signal('Biblioteca');

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroUsuariosService: CadastroUsuariosService
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

    this.cadastroUsuariosService
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
