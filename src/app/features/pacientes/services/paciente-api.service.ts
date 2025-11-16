import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Paciente, PacienteSave } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteApiService {
  private baseUrl = `${environment.apiBase}/pacientes`; // MINÚSCULO

  constructor(private http: HttpClient) {}

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
  }

  obterPorId(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  criar(dto: PacienteSave): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, dto);
  }

  atualizar(id: string, dto: PacienteSave): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
