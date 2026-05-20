import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminCadastroBibliotecaService } from './services/admin.cadastro.biblioteca.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-cadastro-biblioteca',
  imports: [RouterModule, CommonModule, AdminHeader, AdminSidebar, ReactiveFormsModule ],
  templateUrl: './admin.cadastro.biblioteca.component.html',
  styleUrl: './admin.cadastro.biblioteca.component.scss'
})
export class AdminCadastroBiblioteca implements OnInit {
  protected readonly title = signal('Biblioteca');

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCadastroBibliotecaService: AdminCadastroBibliotecaService,
    private cdr: ChangeDetectorRef
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      estado: ['', [Validators.required, Validators.maxLength(150)]],
      cidade: ['', [Validators.required, Validators.maxLength(150)]],
      bairro: ['', [Validators.required, Validators.maxLength(150)]],
      rua: ['', [Validators.required, Validators.maxLength(150)]],
      numero: ['', Validators.required],
    });
  }

  
  public cadastrar(): void {

    if(this.cadastroForm.invalid){

      this.cadastroForm.markAllAsTouched();

      return;
    }

    this.adminCadastroBibliotecaService
      .cadastrar(this.cadastroForm.value)
      .subscribe({

        next: (resposta) => {

          console.log('Biblioteca cadastrada com sucesso!');
          console.log(resposta);
          alert('Biblioteca cadastrada com sucesso!');
          this.cdr.detectChanges();

        },

        error: (erro) => {

          console.error('Erro ao cadastrar biblioteca!');
          console.error(erro);
          alert('Erro ao cadastrar biblioteca');

        }

      });

  }


  ngOnInit(): void {
    
  }
}
