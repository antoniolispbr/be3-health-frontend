import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Convenio {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class ConvenioApiService {
  private baseUrl = `${environment.apiBase}/convenios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(this.baseUrl);
  }
}
