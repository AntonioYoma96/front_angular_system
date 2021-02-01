import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ArchivoTicket,
  AreaTicket,
  DificultadTicket,
  EtapaTicket,
  Mensaje,
  Origen,
  Prioridad,
  Ticket,
  TipoTicket,
} from 'src/app/models/ticket';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getOrigenes(): Observable<Origen[]> {
    return this.http.get<Origen[]>(`${this.apiUrl}/api/ticket/origenes/`);
  }

  getPrioridades(): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(`${this.apiUrl}/api/ticket/prioridades/`);
  }

  getTiposTickets(): Observable<TipoTicket[]> {
    return this.http.get<TipoTicket[]>(
      `${this.apiUrl}/api/ticket/tipos-ticket/`
    );
  }

  getEtapasTickets(): Observable<EtapaTicket[]> {
    return this.http.get<EtapaTicket[]>(
      `${this.apiUrl}/api/ticket/etapas-ticket/`
    );
  }

  getAreasTickets(): Observable<AreaTicket[]> {
    return this.http.get<AreaTicket[]>(
      `${this.apiUrl}/api/ticket/areas-ticket/`
    );
  }

  getDificultadTicketByArea(areaId: number): Observable<DificultadTicket[]> {
    return this.http.get<DificultadTicket[]>(
      `${this.apiUrl}/api/ticket/dificultad-ticket/?area_ticket=${areaId}`
    );
  }

  createTicket(newTicket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${this.apiUrl}/api/ticket/tickets/`,
      newTicket
    );
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/api/ticket/tickets/`);
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${this.apiUrl}/api/ticket/tickets/${ticketId}`
    );
  }

  uploadTicketFile(form: FormData): Observable<ArchivoTicket> {
    return this.http.post<ArchivoTicket>(
      `${this.apiUrl}/api/ticket/archivos-ticket/`,
      form
    );
  }

  getMensajes(ticketId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(
      `${this.apiUrl}/api/ticket/mensajes/?ticket=${ticketId}`
    );
  }
}
