import { Colaborador } from './colaborador';

class DatosContractuales {
  id?: number;
  colaborador: Colaborador;
  fechaInicio: string;
  fechaTermino?: string;
  sueldoBase?: number;
  tipoContrato: TipoContrato;
  fechaVencimiento?: string;
  previsionAfp: PrevisionAfp;
  previsionSalud: PrevisionSalud;
  banco?: Banco;
  tipoCuenta?: TipoCuenta;
  numeroCuenta?: string;

  constructor() {
    this.colaborador = new Colaborador();
    this.fechaInicio = '';
    this.tipoContrato = new TipoContrato();
    this.previsionAfp = new PrevisionAfp();
    this.previsionSalud = new PrevisionSalud();
  }
}

class TipoContrato {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class PrevisionAfp {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class PrevisionSalud {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Banco {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class TipoCuenta {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export {
  DatosContractuales,
  TipoContrato,
  PrevisionAfp,
  PrevisionSalud,
  Banco,
  TipoCuenta,
};
