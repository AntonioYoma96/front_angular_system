import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Modulo } from 'src/app/models/actividades';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActividadService {
  apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(`${this.apiUrl}/api/actividad/modulos/`);
  }
}
