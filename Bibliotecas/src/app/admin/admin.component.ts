import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminHeader } from '../shared/component/admin_header/admin.header.component';
import { AdminSidebar } from '../shared/component/admin_sidebar/admin.sidebar.component';

import { DashboardService } from './services/admin.service';
import { DashboardAdmin } from './models/admin.model';

@Component({
  selector: 'app-admin',
  imports: [RouterModule, CommonModule, AdminHeader, AdminSidebar],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class Admin implements OnInit {

  protected readonly title = signal('Biblioteca');

  dashboard!: DashboardAdmin;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {

    this.dashboardService.buscarDashboard()
      .subscribe({

        next: (resposta) => {

          this.dashboard = resposta;

        },

        error: (erro) => {

          console.error(
            'Erro ao carregar dashboard',
            erro
          );

        }

      });
  }
}