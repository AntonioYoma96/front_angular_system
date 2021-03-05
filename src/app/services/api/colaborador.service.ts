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

  getComuna(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/comunas/`)
  }

  getEstadosCiviles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/estados-civiles/`)
  }

  postEstadosCiviles(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/colaborador/estados-civiles/`, {
        nombre,
      })
  }

  deleteEstadosCiviles(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/colaborador/estados-civiles/${id}`, {
      })
  }

  putEstadosCiviles(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/colaborador/estados-civiles/${id}/`, {
        id,
        nombre
      })
  }

  getNacionalidades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/nacionalidades/`)
  }

  postNacionalidades(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/colaborador/nacionalidades/`, {
        nombre,
      })
  }

  deleteNacionalidades(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/colaborador/nacionalidades/${id}`, {
      })
  }

  putNacionalidades(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/colaborador/nacionalidades/${id}/`, {
        id,
        nombre
      })
  }

  getNivelesSkill(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/niveles-skill/`)
  }

  postNivelesSkill(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/colaborador/niveles-skill/`, {
        nombre,
      })
  }

  deleteNivelesSkill(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/colaborador/niveles-skill/${id}`, {
      })
  }

  putNivelesSkill(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/colaborador/niveles-skill/${id}/`, {
        id,
        nombre
      })
  }

  getProvincias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/provincias/`)
  }

  getRegiones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/regiones/`)
  }

  getSexos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/sexos/`)
  }

  postSexos(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/colaborador/sexos/`, {
        nombre,
      })
  }

  deleteSexos(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/colaborador/sexos/${id}`, {
      })
  }

  putSexos(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/colaborador/sexos/${id}/`, {
        id,
        nombre
      })
  }

  getSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/colaborador/skills/`)
  }

  postSkills(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/colaborador/skills/`, {
        nombre,
      })
  }

  deleteSkills(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/colaborador/skills/${id}`, {
      })
  }

  putSkills(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/colaborador/skills/${id}/`, {
        id,
        nombre
      })
  }
}
