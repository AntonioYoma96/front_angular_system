import { Colaborador } from './colaborador';
import { Modulo } from './actividades';

class Ticket {
  id?: number;
  asignado: Colaborador;
  solicitante: Colaborador;
  validador?: Colaborador;
  origen: Origen;
  modulo: Modulo;
  version?: string;
  prioridad: Prioridad;
  tipoTicket: TipoTicket;
  fechaLimite?: string;
  ruta?: string;
  asunto: string;
  descripcion: string;
  etapaTicket: EtapaTicket;
  created?: string;
  modified?: string;

  constructor() {
    this.asignado = new Colaborador();
    this.solicitante = new Colaborador();
    this.origen = new Origen();
    this.modulo = new Modulo();
    this.prioridad = new Prioridad();
    this.tipoTicket = new TipoTicket();
    this.asunto = '';
    this.descripcion = '';
    this.etapaTicket = new EtapaTicket();
  }
}

class TicketLog {
  id?: number;
  ticket: Ticket;
  asignado: Colaborador;
  etapaTicket: EtapaTicket;
  inicioEtapa: string;
  finEtapa?: string;

  constructor() {
    this.ticket = new Ticket();
    this.asignado = new Colaborador();
    this.etapaTicket = new EtapaTicket();
    this.inicioEtapa = '';
  }
}

class Prioridad {
  id?: number;
  nombre: string;
  valor: number;

  constructor() {
    this.nombre = '';
    this.valor = 0;
  }
}

class TipoTicket {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class EtapaTicket {
  id?: number;
  nombre: string;
  tipo?: string;
  dificultad?: string;
  revMin?: number;
  revMax?: number;
  devMin?: number;
  devMax?: number;

  constructor() {
    this.nombre = '';
  }
}

class ImagenTicket {
  id?: number;
  ticket: Ticket;
  imagen: string;

  constructor() {
    this.ticket = new Ticket();
    this.imagen = '';
  }
}

class Mensaje {
  id?: number;
  ticket: Ticket;
  asunto: string;
  descripcion: string;
  created?: string;
  modified?: string;

  constructor() {
    this.ticket = new Ticket();
    this.asunto = '';
    this.descripcion = '';
  }
}

class ImagenMensaje {
  id?: number;
  mensaje: Mensaje;
  imagen: string;

  constructor() {
    this.mensaje = new Mensaje();
    this.imagen = '';
  }
}

class Etiqueta {
  id?: number;
  nombre: string;
  nivelSeveridad: string;
  tickets?: number[];
  mensajes?: number[];

  constructor() {
    this.nombre = '';
    this.nivelSeveridad = '';
  }
}

class Origen {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export {
  Ticket,
  TicketLog,
  Prioridad,
  TipoTicket,
  EtapaTicket,
  ImagenTicket,
  Mensaje,
  ImagenMensaje,
  Etiqueta,
  Origen,
};
