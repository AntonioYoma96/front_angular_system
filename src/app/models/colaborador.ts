class Colaborador {
  id?: number;
  usuario: number;
  run: string;
  nombre: string;
  segundoNombre?: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  fechaDefuncion?: string;
  sexo: Sexo;
  estadoCivil: EstadoCivil;
  nacionalidad: Nacionalidad;
  direccion?: string;
  comuna: Comuna;
  telefonoFijo?: string;
  telefonoMovil?: string;
  emailPersonal: string;
  fechaIngreso: string;
  created?: string;
  modified?: string;

  constructor() {
    this.usuario = 0;
    this.run = '';
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.sexo = new Sexo();
    this.estadoCivil = new EstadoCivil();
    this.nacionalidad = new Nacionalidad();
    this.comuna = new Comuna();
    this.emailPersonal = '';
    this.fechaIngreso = '';
  }
}

class Sexo {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class EstadoCivil {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Nacionalidad {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class Comuna {
  id?: number;
  codigo: string;
  nombre: string;
  provincia: Provincia;

  constructor() {
    this.codigo = '';
    this.nombre = '';
    this.provincia = new Provincia();
  }
}

class Provincia {
  id?: number;
  codigo: string;
  nombre: string;
  region: Region;

  constructor() {
    this.codigo = '';
    this.nombre = '';
    this.region = new Region();
  }
}

class Region {
  id?: number;
  codigo: string;
  nombre: string;

  constructor() {
    this.codigo = '';
    this.nombre = '';
  }
}

class Hijo {
  id?: number;
  colaborador: Colaborador;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  run?: string;
  fechaNacimiento: string;

  constructor() {
    this.colaborador = new Colaborador();
    this.nombres = '';
    this.apellidoPaterno = '';
    this.fechaNacimiento = '';
  }
}

class PersonaContacto {
  id?: number;
  colaborador: Colaborador;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  telefono: '';

  constructor() {
    this.colaborador = new Colaborador();
    this.nombres = '';
    this.apellidoPaterno = '';
    this.telefono = '';
  }
}

class ColaboradorSkill {
  id?: number;
  colaborador: Colaborador;
  skill: Skill;
  nivelSkill: NivelSkill;

  constructor() {
    this.colaborador = new Colaborador();
    this.skill = new Skill();
    this.nivelSkill = new NivelSkill();
  }
}

class Skill {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

class NivelSkill {
  id?: number;
  nombre: string;

  constructor() {
    this.nombre = '';
  }
}

export {
  Colaborador,
  Sexo,
  EstadoCivil,
  Nacionalidad,
  Comuna,
  Provincia,
  Region,
  Hijo,
  PersonaContacto,
  ColaboradorSkill,
  Skill,
  NivelSkill,
};
