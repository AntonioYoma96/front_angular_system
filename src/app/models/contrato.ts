import { Colaborador } from 'src/app/models/colaborador';
import { DatosOrganizacionales } from 'src/app/models/organizacion';

interface DatosContractuales {
  id: number;
  colaborador: Colaborador;
  fecha_inicio: string;
  fecha_termino: string;
  sueldo_base: number;
  tipo_contrato: TipoContrato;
  fecha_vencimiento: string;
  prevision_afp: PrevisionAfp;
  prevision_salud: PrevisionSalud;
  banco: Banco;
  tipo_cuenta: TipoCuenta;
  numero_cuenta: string;
  organizacion: DatosOrganizacionales;
}

interface TipoContrato {
  id: number;
  nombre: string;
}

interface PrevisionAfp {
  id: number;
  nombre: string;
}

interface PrevisionSalud {
  id: number;
  nombre: string;
}

interface Banco {
  id: number;
  nombre: string;
}

interface TipoCuenta {
  id: number;
  nombre: string;
}

export {
  DatosContractuales,
  TipoContrato,
  PrevisionAfp,
  PrevisionSalud,
  Banco,
  TipoCuenta,
};
