import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.sidebar.component.html',
  styleUrl: './admin.sidebar.component.scss'
})
export class AdminSidebar {
  protected readonly title = signal('Biblioteca');
}
