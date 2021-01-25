import { Colaborador } from 'src/app/models/colaborador';
import { Modulo } from 'src/app/models/actividades';

interface Ticket {
  id: number;
  asignado: Colaborador;
  solicitante: Colaborador;
  validador: Colaborador;
  origen: Origen;
  modulo: Modulo;
  version: string;
  prioridad: Prioridad;
  tipo_ticket: TipoTicket;
  fecha_limite: string;
  ruta: string;
  asunto: string;
  descripcion: string;
  etapa_ticket: EtapaTicket;
  created: string;
  modified: string;
}

interface TicketLog {
  id: number;
  ticket: Ticket;
  asignado: Colaborador;
  etapa_ticket: EtapaTicket;
  inicio_etapa: string;
  fin_etapa: string;
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

interface ImagenTicket {
  id: number;
  ticket: Ticket;
  imagen: string;
}

interface Mensaje {
  id: number;
  ticket: Ticket;
  asunto: string;
  descripcion: string;
  created: string;
  modified: string;
}

interface ImagenMensaje {
  id: number;
  mensaje: Mensaje;
  imagen: string;
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
  ImagenTicket,
  Mensaje,
  ImagenMensaje,
  Etiqueta,
  Origen,
};
