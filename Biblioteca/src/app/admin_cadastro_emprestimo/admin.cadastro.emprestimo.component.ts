import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminCadastroEmprestimoService } from './services/admin.cadastro.emprestimo.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-cadastro-emprestimo',
  imports: [RouterModule, CommonModule, AdminHeader, AdminSidebar, ReactiveFormsModule],
  templateUrl: './admin.cadastro.emprestimo.component.html',
  styleUrl: './admin.cadastro.emprestimo.component.scss'
})
export class AdminCadastroEmprestimo implements OnInit {
  protected readonly title = signal('Biblioteca');

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCadastroEmprestimoService: AdminCadastroEmprestimoService,
    private cdr: ChangeDetectorRef
  ) {
    this.cadastroForm = this.formBuilder.group({
      idUsuario: ['', [Validators.required]],
      idLivro: ['', [Validators.required]],
      idBiblioteca: ['', [Validators.required]],
    });
  }
  

  public cadastrar(): void {

    if(this.cadastroForm.invalid){

      this.cadastroForm.markAllAsTouched();

      return;
    }

    this.adminCadastroEmprestimoService
      .cadastrar(this.cadastroForm.value)
      .subscribe({

        next: (resposta) => {

          console.log('Empréstimo cadastrado com sucesso!');
          console.log(resposta);
          alert('Empréstimo cadastrado com sucesso!');

          this.cdr.detectChanges();
        },

        error: (erro) => {

          console.error('Erro ao cadastrar empréstimo!');
          console.error(erro);
          alert('Erro ao cadastrar empréstimo');

        }

      });

  }


  ngOnInit(): void {
    
  }
}
