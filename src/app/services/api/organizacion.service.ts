import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  apiUrl = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  getAreasFuncionales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/organizacion/areas-funcionales/`)
  }

  postAreasFuncionales(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/organizacion/areas-funcionales/`, {
        nombre,
      })
  }

  deleteAreasFuncionales(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/organizacion/areas-funcionales/${id}`, {
      })
  }

  putAreasFuncionales(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/organizacion/areas-funcionales/${id}/`, {
        id,
        nombre
      })
  }

  getCargos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/organizacion/cargos/`)
  }

  postCargo(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/organizacion/cargos/`, {
        nombre,
      })
  }

  deleteCargo(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/organizacion/cargos/${id}`, {
      })
  }

  putCargo(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/organizacion/cargos/${id}/`, {
        id,
        nombre
      })
  }

  getCentrosCosto(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/organizacion/centros-costo/`)
  }

  postCentrosCosto(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/organizacion/centros-costo/`, {
        nombre,
      })
  }

  deleteCentrosCosto(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/organizacion/centros-costo/${id}`, {
      })
  }

  putCentrosCosto(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/organizacion/centros-costo/${id}/`, {
        id,
        nombre
      })
  }

  getNivelesResponsabilidad(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/organizacion/niveles-responsabilidad/`)
  }

  postNivelesResponsabilidad(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/organizacion/niveles-responsabilidad/`, {
        nombre,
      })
  }

  deleteNivelesResponsabilidad(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/organizacion/niveles-responsabilidad/${id}`, {
      })
  }

  putNivelesResponsabilidad(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/organizacion/niveles-responsabilidad/${id}/`, {
        id,
        nombre
      })
  }

  getUnidades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/organizacion/unidades/`)
  }

  postUnidades(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/organizacion/unidades/`, {
        nombre,
      })
  }

  deleteUnidades(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/organizacion/unidades/${id}`, {
      })
  }

  putUnidades(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/organizacion/unidades/${id}/`, {
        id,
        nombre
      })
  }
}
