import { DatosContractuales } from 'src/app/models/contrato';
import { Colaborador } from 'src/app/models/colaborador';

interface DatosOrganizacionales {
  id: number;
  datos_contractuales: DatosContractuales;
  cargo: Cargo;
  unidad: Unidad;
  nivel_responsabilidad: NivelResponsabilidad;
  jefe_directo: Colaborador;
  centro_costo: CentroCosto;
}

interface Cargo {
  id: number;
  nombre: string;
}

interface Unidad {
  id: number;
  nombre: string;
  area_funcional: AreaFuncional;
}

interface AreaFuncional {
  id: number;
  nombre: string;
}

interface NivelResponsabilidad {
  id: number;
  nombre: string;
}

interface CentroCosto {
  id: number;
  nombre: string;
}

export {
  DatosOrganizacionales,
  Cargo,
  Unidad,
  AreaFuncional,
  NivelResponsabilidad,
  CentroCosto,
};
