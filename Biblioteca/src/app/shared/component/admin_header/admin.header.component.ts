import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.header.component.html',
  styleUrl: './admin.header.component.scss'
})
export class AdminHeader {
  protected readonly title = signal('Biblioteca');
}
