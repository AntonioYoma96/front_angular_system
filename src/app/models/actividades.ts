import { Cargo } from 'src/app/models/organizacion';
import { Colaborador } from 'src/app/models/colaborador';

interface Actividad {
  id: number;
  colaborador: Colaborador;
  fecha: string;
  hora_inicio: string;
  hora_termino: string;
  datos_actividad: DatosActividad;
  proyecto: Proyecto;
  observaciones: string;
  created: string;
  modified: string;
}

interface DatosActividad {
  id: number;
  nombre: string;
  descripcion: string;
  tiempo_maximo: number;
  tiempo_minimo: number;
  cargo: Cargo;
}

interface Proyecto {
  id: number;
  nombre: string;
  cliente: Cliente;
  repositorio: string;
}

interface Cliente {
  id: number;
  nombre: string;
}

interface MesaAyuda {
  id: number;
  actividad: Actividad;
  tipo_soporte: TipoSoporte;
  modulo: Modulo;
  funcionario: string;
  telefono: string;
  email: string;
  is_habil: boolean;
  created: string;
  modified: string;
}

interface TipoSoporte {
  id: number;
  nombre: string;
}

interface Modulo {
  id: number;
  nombre: string;
  proyecto: Proyecto;
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
