import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { TicketsComponent } from 'src/app/components/tickets/tickets.component';
import { RecoveryComponent } from 'src/app/components/auth/recovery/recovery.component';
import { NewPasswordComponent } from 'src/app/components/auth/new-password/new-password.component';
import { MantenedorBancosComponent } from 'src/app/components/mantenedor/contrato/mantenedor-bancos/mantenedor-bancos.component'
import { MantenedorCargosComponent } from 'src/app/components/mantenedor/contrato/mantenedor-cargos/mantenedor-cargos.component'
import { MantenedorCarreraComponent } from 'src/app/components/mantenedor/contrato/mantenedor-carrera/mantenedor-carrera.component'
import { MantenedorCentrosCostoComponent } from 'src/app/components/mantenedor/contrato/mantenedor-centros-costo/mantenedor-centros-costo.component'
import { MantenedorClientesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-clientes/mantenedor-clientes.component'
import { MantenedorComunasComponent } from 'src/app/components/mantenedor/contrato/mantenedor-comunas/mantenedor-comunas.component'
import { MantenedorDatosActividadComponent } from 'src/app/components/mantenedor/contrato/mantenedor-datos-actividad/mantenedor-datos-actividad.component'
import { MantenedorDificultadTicketsComponent } from 'src/app/components/mantenedor/contrato/mantenedor-dificultad-tickets/mantenedor-dificultad-tickets.component'
import { MantenedorDiplomasComponent } from 'src/app/components/mantenedor/contrato/mantenedor-diplomas/mantenedor-diplomas.component'
import { MantenedorEstadosCivilesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-estados-civiles/mantenedor-estados-civiles.component'
import { MantenedorInstitucionesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-instituciones/mantenedor-instituciones.component'
import { MantenedorModulosComponent } from 'src/app/components/mantenedor/contrato/mantenedor-modulos/mantenedor-modulos.component'
import { MantenedorNacionalidadesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-nacionalidades/mantenedor-nacionalidades.component'
import { MantenedorNivelesResponsabilidadComponent } from 'src/app/components/mantenedor/contrato/mantenedor-niveles-responsabilidad/mantenedor-niveles-responsabilidad.component'
import { MantenedorNivelesSkillComponent } from 'src/app/components/mantenedor/contrato/mantenedor-niveles-skill/mantenedor-niveles-skill.component'
import { MantenedorOrigenesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-origenes/mantenedor-origenes.component'
import { MantenedorPrevisionesAfpComponent } from 'src/app/components/mantenedor/contrato/mantenedor-previsiones-afp/mantenedor-previsiones-afp.component'
import { MantenedorPrevisionesSaludComponent } from 'src/app/components/mantenedor/contrato/mantenedor-previsiones-salud/mantenedor-previsiones-salud.component'
import { MantenedorPrioridadesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-prioridades/mantenedor-prioridades.component'
import { MantenedorProvinciasComponent } from 'src/app/components/mantenedor/contrato/mantenedor-provincias/mantenedor-provincias.component'
import { MantenedorProyectosComponent } from 'src/app/components/mantenedor/contrato/mantenedor-proyectos/mantenedor-proyectos.component'
import { MantenedorRegionesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-regiones/mantenedor-regiones.component'
import { MantenedorSexosComponent } from 'src/app/components/mantenedor/contrato/mantenedor-sexos/mantenedor-sexos.component'
import { MantenedorSkillsComponent } from 'src/app/components/mantenedor/contrato/mantenedor-skills/mantenedor-skills.component'
import { MantenedorTiposContratoComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-contrato/mantenedor-tipos-contrato.component'
import { MantenedorTiposCuentaComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-cuenta/mantenedor-tipos-cuenta.component'
import { MantenedorTiposFormacionComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-formacion/mantenedor-tipos-formacion.component'
import { MantenedorTiposInstitucionComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-institucion/mantenedor-tipos-institucion.component'
import { MantenedorTiposSoporteComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-soporte/mantenedor-tipos-soporte.component'
import { MantenedorTiposTicketComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-ticket/mantenedor-tipos-ticket.component'
import { MantenedorTiposOtroFormacionComponent } from 'src/app/components/mantenedor/contrato/mantenedor-tipos-otro-formacion/mantenedor-tipos-otro-formacion.component'
import { MantenedorUnidadesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-unidades/mantenedor-unidades.component'
import { MantenedorAreasTicketComponent } from 'src/app/components/mantenedor/contrato/mantenedor-areas-ticket/mantenedor-areas-ticket.component'
import { MantenedorAreasFuncionalesComponent } from 'src/app/components/mantenedor/contrato/mantenedor-areas-funcionales/mantenedor-areas-funcionales.component'




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'mantenedor-bancos', component: MantenedorBancosComponent , canActivate: [AuthGuard] }, 
  { path: 'mantenedor-cargos', component: MantenedorCargosComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-carrera', component: MantenedorCarreraComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-centros-costo', component: MantenedorCentrosCostoComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-clientes', component: MantenedorClientesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-comunas', component: MantenedorComunasComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-datos-actividad', component: MantenedorDatosActividadComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-dificultad-tickets', component: MantenedorDificultadTicketsComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-diplomas', component: MantenedorDiplomasComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-estados-civiles', component: MantenedorEstadosCivilesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-instituciones', component: MantenedorInstitucionesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-modulos', component: MantenedorModulosComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-nacionalidades', component: MantenedorNacionalidadesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-niveles-responsabilidad', component: MantenedorNivelesResponsabilidadComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-niveles-skill', component: MantenedorNivelesSkillComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-origenes', component: MantenedorOrigenesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-previsiones-afp', component: MantenedorPrevisionesAfpComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-previsiones-salud', component: MantenedorPrevisionesSaludComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-prioridades', component: MantenedorPrioridadesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-provincias', component: MantenedorProvinciasComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-proyectos', component: MantenedorProyectosComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-regiones', component: MantenedorRegionesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-sexos', component: MantenedorSexosComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-skills', component: MantenedorSkillsComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-contrato', component: MantenedorTiposContratoComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-cuenta', component: MantenedorTiposCuentaComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-formacion', component: MantenedorTiposFormacionComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-institucion', component: MantenedorTiposInstitucionComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-soporte', component: MantenedorTiposSoporteComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-ticket', component: MantenedorTiposTicketComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-tipos-otro-formacion', component: MantenedorTiposOtroFormacionComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-unidades', component: MantenedorUnidadesComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-areas-ticket', component: MantenedorAreasTicketComponent, canActivate: [AuthGuard] },
  { path: 'mantenedor-areas-funcionales', component: MantenedorAreasFuncionalesComponent, canActivate: [AuthGuard] },




  

  // Everything else
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
