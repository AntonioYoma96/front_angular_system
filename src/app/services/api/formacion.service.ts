import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormacionService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/carreras/`)
  }

  postCarreras(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/formacion/carreras/`, {
        nombre,
      })
  }

  deleteCarreras(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/formacion/carreras/${id}`, {
      })
  }

  putCarreras(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/formacion/carreras/${id}/`, {
        id,
        nombre
      })
  }

  getDiplomas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/diplomas/`)
  }

  postDiplomas(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/formacion/diplomas/`, {
        nombre,
      })
  }

  deleteDiplomas(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/formacion/diplomas/${id}`, {
      })
  }

  putDiplomas(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/formacion/diplomas/${id}/`, {
        id,
        nombre
      })
  }

  getInstituciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/instituciones/`)
  }

  getTiposFormacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/tipos-formacion/`)
  }

  postTiposFormacion(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/formacion/tipos-formacion/`, {
        nombre,
      })
  }

  deleteTiposFormacion(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/formacion/tipos-formacion/${id}`, {
      })
  }

  putTiposFormacion(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/formacion/tipos-formacion/${id}/`, {
        id,
        nombre
      })
  }

  getTiposInstitucion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/tipos-institucion/`)
  }

  postTiposInstitucion(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/formacion/tipos-institucion/`, {
        nombre,
      })
  }

  deleteTiposInstitucion(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/formacion/tipos-institucion/${id}`, {
      })
  }

  putTiposInstitucion(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/formacion/tipos-institucion/${id}/`, {
        id,
        nombre
      })
  }

  getTiposOtroFormacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/formacion/tipos-otro-formacion/`)
  }

  postTiposOtroFormacion(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/formacion/tipos-otro-formacion/`, {
        nombre,
      })
  }

  deleteTiposOtroFormacion(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/formacion/tipos-otro-formacion/${id}`, {
      })
  }

  putTiposOtroFormacion(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/formacion/tipos-otro-formacion/${id}/`, {
        id,
        nombre
      })
  }
}
