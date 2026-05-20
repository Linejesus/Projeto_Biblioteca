import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardAdmin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  buscarDashboard(): Observable<DashboardAdmin> {

    return this.http.get<DashboardAdmin>(this.apiUrl);

  }
}