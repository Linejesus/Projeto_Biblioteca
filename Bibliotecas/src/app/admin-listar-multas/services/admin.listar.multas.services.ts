import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multa } from '../models/admin.listar.multa.model';

@Injectable({
  providedIn: 'root'
})
export class AdminListarMultasService {

  private apiUrl = 'http://localhost:8080/multas';

  constructor(private http: HttpClient) {}

  listarMultas(): Observable<Multa[]> {
    return this.http.get<Multa[]>(this.apiUrl);
  }

  atualizarMulta(multa: Multa): Observable<Multa> {
    return this.http.put<Multa>(
      `${this.apiUrl}/pagar/${multa.idMulta}`,
      multa
    );
  }

//   deletarUsuario(id: number): Observable<void> {
//     return this.http.delete<void>(
//       `${this.apiUrl}/${id}`
//     );
//   }
}