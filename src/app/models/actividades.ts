import { Cargo } from './organizacion';
import { Colaborador } from './colaborador';

class Actividad {
  id?: number;
  colaborador: Colaborador;
  fecha: string;
  horaInicio: string;
  horaTermino?: string;
  datosActividad: DatosActividad;
  proyecto: Proyecto;
  observaciones?: string;
  created?: string;
  modified?: string;

  constructor() {
    this.colaborador = new Colaborador();
    this.fecha = '';
    this.horaInicio = '';
    this.datosActividad = new DatosActividad();
    this.proyecto = new Proyecto();
  }
}

class DatosActividad {
  id?: number;
  nombre: string;
  descripcion?: string;
  tiempoMaximo?: number;
  tiempoMinimo?: number;
  cargo: Cargo;

  constructor() {
    this.nombre = '';
    this.cargo = new Cargo();
  }
}

class Proyecto {
  id?: number;
  nombre: string;
  cliente: Cliente;
  repositorio?: string;

  constructor() {
    this.nombre = '';
    this.cliente = new Cliente();
  }
}

class Cliente {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class MesaAyuda {
  id?: number;
  actividad: Actividad;
  tipoSoporte: TipoSoporte;
  modulo: Modulo;
  funcionario: string;
  telefono?: string;
  email?: string;
  isHabil: boolean;
  created?: string;
  modified?: string;

  constructor() {
    this.actividad = new Actividad();
    this.tipoSoporte = new TipoSoporte();
    this.modulo = new Modulo();
    this.funcionario = '';
    this.isHabil = false;
  }
}

class TipoSoporte {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Modulo {
  id?: number;
  nombre: string;
  proyecto: Proyecto;

  constructor() {
    this.nombre = '';
    this.proyecto = new Proyecto();
  }
}

export {
  Actividad,
  DatosActividad,
  Proyecto,
  Cliente,
  MesaAyuda,
  TipoSoporte,
  Modulo,
};
