import { DatosContractuales } from './contrato';
import { Colaborador } from './colaborador';

class DatosOrganizacionales {
  id?: number;
  datosContractuales: DatosContractuales;
  cargo: Cargo;
  unidad: Unidad;
  nivelResponsabilidad: NivelResponsabilidad;
  jefeDirecto?: Colaborador;
  centroCosto: CentroCosto;

  constructor() {
    this.datosContractuales = new DatosContractuales();
    this.cargo = new Cargo();
    this.unidad = new Unidad();
    this.nivelResponsabilidad = new NivelResponsabilidad();
    this.centroCosto = new CentroCosto();
  }
}

class Cargo {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Unidad {
  id?: number;
  nombre: string;
  areaFuncional: AreaFuncional;

  constructor() {
    this.nombre = '';
    this.areaFuncional = new AreaFuncional();
  }
}

class AreaFuncional {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class NivelResponsabilidad {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class CentroCosto {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export {
  DatosOrganizacionales,
  Cargo,
  Unidad,
  AreaFuncional,
  NivelResponsabilidad,
  CentroCosto,
};
