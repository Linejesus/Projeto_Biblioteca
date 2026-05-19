import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Header } from '../shared/component/header/header.component';
import { HomeService } from './services/home.service';
import { LivroHome } from './models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterModule, CommonModule, Header],
})
export class Home implements OnInit, OnDestroy {

  livrosHome: LivroHome[] = [];
  melhoresAvaliados: LivroHome[] = [];

  private routerSubscription: Subscription | null = null;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDados();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.carregarDados();
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  carregarDados(): void {
    this.carregarLivrosHome();
    this.carregarMelhoresAvaliados();
  }

  carregarLivrosHome(): void {
    this.homeService.buscarLivrosHome()
      .subscribe({
        next: (dados) => {
          this.livrosHome = dados;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao carregar livros home:', erro);
        }
      });
  }

  carregarMelhoresAvaliados(): void {
    this.homeService.buscarMelhorAvaliados()
      .subscribe({
        next: (dados) => {
          this.melhoresAvaliados = dados;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao carregar melhores avaliados:', erro);
        }
      });
  }

}