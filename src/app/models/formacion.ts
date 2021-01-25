import { Colaborador } from 'src/app/models/colaborador';

interface DatosFormacion {
  id: number;
  colaborador: Colaborador;
  tipo_formacion: TipoFormacion;
  carrera: Carrera;
  estado_formacion: EstadoFormacion;
  fecha_termino: string;
  institucion: Institucion;
}

interface TipoFormacion {
  id: number;
  nombre: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

interface EstadoFormacion {
  id: number;
  nombre: string;
}

interface Institucion {
  id: number;
  tipo_institucion: TipoInstitucion;
  nombre: string;
}

interface TipoInstitucion {
  id: number;
  nombre: string;
}

interface OtroFormacion {
  id: number;
  colaborador: Colaborador;
  institucion: Institucion;
  tipo_otro_formacion: TipoOtroFormacion;
  diploma: Diploma;
  horas: number;
}

interface TipoOtroFormacion {
  id: number;
  nombre: string;
}

interface Diploma {
  id: number;
  nombre: string;
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
