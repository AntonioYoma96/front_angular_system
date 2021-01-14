import { Colaborador } from './colaborador';

class DatosFormacion {
  id?: number;
  colaborador: Colaborador;
  tipoFormacion: TipoFormacion;
  carrera: Carrera;
  estadoFormacion: EstadoFormacion;
  fechaTermino: string;
  institucion: Institucion;

  constructor() {
    this.colaborador = new Colaborador();
    this.tipoFormacion = new TipoFormacion();
    this.carrera = new Carrera();
    this.estadoFormacion = new EstadoFormacion();
    this.fechaTermino = '';
    this.institucion = new Institucion();
  }
}

class TipoFormacion {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Carrera {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class EstadoFormacion {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Institucion {
  id?: number;
  tipoInstitucion: TipoInstitucion;
  nombre: string;

  constructor() {
    this.tipoInstitucion = new TipoInstitucion();
    this.nombre = '';
  }
}

class TipoInstitucion {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class OtroFormacion {
  id?: number;
  colaborador: Colaborador;
  institucion: Institucion;
  tipoOtroFormacion: TipoOtroFormacion;
  diploma: Diploma;
  horas: number;

  constructor() {
    this.colaborador = new Colaborador();
    this.institucion = new Institucion();
    this.tipoOtroFormacion = new TipoOtroFormacion();
    this.diploma = new Diploma();
    this.horas = 0;
  }
}

class TipoOtroFormacion {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Diploma {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export {
  DatosFormacion,
  TipoFormacion,
  Carrera,
  EstadoFormacion,
  Institucion,
  TipoInstitucion,
  OtroFormacion,
  TipoOtroFormacion,
  Diploma,
};
