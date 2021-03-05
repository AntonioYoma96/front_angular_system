import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBancos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/contrato/bancos/`)
  }

  postBancos(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/contrato/bancos/`, {
        nombre,
      })
  }

  deleteBancos(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/contrato/bancos/${id}`, {
      })
  }

  putBancos(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/contrato/bancos/${id}/`, {
        id,
        nombre
      })
  }

  getPrevisionesAFP(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/contrato/previsiones-afp/`)
  }

  postPrevisionesAFP(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/contrato/previsiones-afp/`, {
        nombre,
      })
  }

  deletePrevisionesAFP(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/contrato/previsiones-afp/${id}`, {
      })
  }

  putPrevisionesAFP(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/contrato/previsiones-afp/${id}/`, {
        id,
        nombre
      })
  }

  getPrevisionesSalud(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/contrato/previsiones-salud/`)
  }

  postPrevisionesSalud(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/contrato/previsiones-salud/`, {
        nombre,
      })
  }

  deletePrevisionesSalud(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/contrato/previsiones-salud/${id}`, {
      })
  }

  putPrevisionesSalud(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/contrato/previsiones-salud/${id}/`, {
        id,
        nombre
      })
  }

  getTiposContrato(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/contrato/tipos-contrato/`)
  }

  postTiposContrato(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/contrato/tipos-contrato/`, {
        nombre,
      })
  }

  deleteTiposContrato(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/contrato/tipos-contrato/${id}`, {
      })
  }

  putTiposContrato(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/contrato/tipos-contrato/${id}/`, {
        id,
        nombre
      })
  }

  getTiposCuenta(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/contrato/tipos-cuenta/`)
  }

  postTiposCuenta(nombre: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/contrato/tipos-cuenta/`, {
        nombre,
      })
  }

  deleteTiposCuenta(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/contrato/tipos-cuenta/${id}`, {
      })
  }

  putTiposCuenta(id: string, nombre: string): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/api/contrato/tipos-cuenta/${id}/`, {
        id,
        nombre
      })
  }
}
