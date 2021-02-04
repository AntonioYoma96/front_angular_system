import { DatosContractuales } from 'src/app/models/contrato';

interface Colaborador {
  id: number;
  usuario: number;
  run: string;
  nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  fecha_defuncion: string;
  sexo: Sexo;
  estado_civil: EstadoCivil;
  nacionalidad: Nacionalidad;
  direccion: string;
  comuna: Comuna;
  telefono_fijo: string;
  telefono_movil: string;
  email_personal: string;
  fecha_ingreso: string;
  created: string;
  modified: string;
  full_name: string;
  last_contrato: DatosContractuales;
}

interface Sexo {
  id: number;
  nombre: string;
}

interface EstadoCivil {
  id: number;
  nombre: string;
}

interface Nacionalidad {
  id: number;
  nombre: string;
}

interface Comuna {
  id: number;
  codigo: string;
  nombre: string;
  provincia: Provincia;
}

interface Provincia {
  id: number;
  codigo: string;
  nombre: string;
  region: Region;
}

interface Region {
  id: number;
  codigo: string;
  nombre: string;
}

interface Hijo {
  id: number;
  colaborador: Colaborador;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  run: string;
  fecha_nacimiento: string;
}

interface PersonaContacto {
  id: number;
  colaborador: Colaborador;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: '';
}

interface ColaboradorSkill {
  id: number;
  colaborador: Colaborador;
  skill: Skill;
  nivel_skill: NivelSkill;
}

interface Skill {
  id: number;
  nombre: string;
}

interface NivelSkill {
  id: number;
  nombre: string;
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
