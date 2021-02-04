import { Colaborador } from 'src/app/models/colaborador';
import { Modulo } from 'src/app/models/actividades';

interface Ticket {
  id?: number;
  asignado: Colaborador;
  solicitante: Colaborador;
  validador: Colaborador;
  origen: Origen;
  modulo: Modulo;
  version?: string;
  prioridad: Prioridad;
  tipo_ticket: TipoTicket;
  fecha_limite?: string;
  ruta?: string;
  asunto: string;
  descripcion: string;
  etapa_ticket: EtapaTicket;
  dificultad_ticket?: DificultadTicket;
  fecha_solicitud?: string;
  created?: string;
  modified?: string;
}

interface TicketLog {
  id: number;
  ticket: Ticket;
  historial: JSON;
  fecha_modificacion: string;
}

interface Prioridad {
  id: number;
  nombre: string;
  valor: number;
}

interface TipoTicket {
  id: number;
  nombre: string;
}

interface EtapaTicket {
  id: number;
  nombre: string;
}

interface AreaTicket {
  id: number;
  nombre: string;
}

interface DificultadTicket {
  id: number;
  tipo: string;
  nivel: string;
  rev_min: number;
  rev_max: number;
  dev_min: number;
  dev_max: number;
  area_ticket: number;
  full_dificultad: string;
}

interface ArchivoTicket {
  id: number;
  ticket: Ticket;
  archivo: File;
}

interface Mensaje {
  id?: number;
  ticket: Ticket | number;
  asunto: string;
  descripcion: string;
  autor: Colaborador;
  created?: string;
  modified?: string;
}

interface ArchivoMensaje {
  id: number;
  mensaje: Mensaje;
  archivo: File;
}

interface Etiqueta {
  id: number;
  nombre: string;
  nivel_severidad: string;
  tickets: Ticket[];
  mensajes: Mensaje[];
}

interface Origen {
  id: number;
  nombre: string;
}

export {
  Ticket,
  TicketLog,
  Prioridad,
  TipoTicket,
  EtapaTicket,
  AreaTicket,
  DificultadTicket,
  ArchivoTicket,
  Mensaje,
  ArchivoMensaje,
  Etiqueta,
  Origen,
};
