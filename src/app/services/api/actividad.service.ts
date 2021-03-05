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

  getClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actividad/clientes/`)
  }

  postClientes(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/actividad/clientes/`, {
        nombre,
      })
  }

  deleteClientes(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/actividad/clientes/${id}`, {
      })
  }

  putClientes(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/actividad/clientes/${id}/`, {
        id,
        nombre
      })
  }

  getDatosActividad(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actividad/datos-actividades/`)
  }

  postDatosActividad(nombre: string, descripcion: string, tiempo_maximo: number, tiempo_minimo: number, cargo: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/actividad/datos-actividades/`, {
        nombre,
        descripcion,
        tiempo_maximo,
        tiempo_minimo,
        cargo
      })
  }

  getProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actividad/proyectos/`)
  }

  getTiposSoporte(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actividad/tipos-soporte/`)
  }

  postTiposSoporte(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/actividad/tipos-soporte/`, {
        nombre,
      })
  }

  deleteTiposSoporte(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/actividad/tipos-soporte/${id}`, {
      })
  }

  putTiposSoporte(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/actividad/tipos-soporte/${id}/`, {
        id,
        nombre
      })
  }
  
}
