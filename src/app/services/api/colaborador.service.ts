import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from 'src/app/models/colaborador';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(
      `${this.apiUrl}/api/colaborador/colaboradores/`
    );
  }
}
