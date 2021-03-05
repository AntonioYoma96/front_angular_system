// Angular core
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular configs
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

// Angular project files
import { SidebarComponent } from 'src/app/components/shared/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TicketsComponent } from 'src/app/components/tickets/tickets.component';
import { TicketsCommentsComponent } from 'src/app/components/tickets/tickets-comments/tickets-comments.component';
import { RecoveryComponent } from './components/auth/recovery/recovery.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';
import { TicketsNewCommentComponent } from './components/tickets/tickets-new-comment/tickets-new-comment.component';
import { TicketsDescriptionComponent } from './components/tickets/tickets-description/tickets-description.component';

// Services
import { HelperService } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { TicketService } from 'src/app/services/api/ticket.service';
import { ActividadService } from 'src/app/services/api/actividad.service';
import { ValidadorService } from 'src/app/services/validador.service'


// Initializer
import { appInitializer } from 'src/app/helpers/appInitializer';

// Interceptors
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';

// Sanitizer
import { SafeHtmlPipe } from 'src/app/helpers/htmlSanitizer';

// PrimeNG modules
import { ButtonModule } from 'primeng-lts/button';
import { RippleModule } from 'primeng-lts/ripple';
import { SplitButtonModule } from 'primeng-lts/splitbutton';
import { PanelModule } from 'primeng-lts/panel';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ToastModule } from 'primeng-lts/toast';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { CalendarModule } from 'primeng-lts/calendar';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { TableModule } from 'primeng-lts/table';
import { EditorModule } from 'primeng-lts/editor';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { FieldsetModule } from 'primeng-lts/fieldset';
import { TabViewModule } from 'primeng-lts/tabview';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { ScrollPanelModule } from 'primeng-lts/scrollpanel';

// PrimeNG services
import { MessageService } from 'primeng-lts/api';
import { ConfirmationService } from 'primeng-lts/api';
import { MantenedorBancosComponent } from './components/mantenedor/contrato/mantenedor-bancos/mantenedor-bancos.component';
import { MantenedorCargosComponent } from './components/mantenedor/contrato/mantenedor-cargos/mantenedor-cargos.component';
import { MantenedorCarreraComponent } from './components/mantenedor/contrato/mantenedor-carrera/mantenedor-carrera.component';
import { MantenedorCentrosCostoComponent } from './components/mantenedor/contrato/mantenedor-centros-costo/mantenedor-centros-costo.component';
import { MantenedorClientesComponent } from './components/mantenedor/contrato/mantenedor-clientes/mantenedor-clientes.component';
import { MantenedorComunasComponent } from './components/mantenedor/contrato/mantenedor-comunas/mantenedor-comunas.component';
import { MantenedorDatosActividadComponent } from './components/mantenedor/contrato/mantenedor-datos-actividad/mantenedor-datos-actividad.component';
import { MantenedorDificultadTicketsComponent } from './components/mantenedor/contrato/mantenedor-dificultad-tickets/mantenedor-dificultad-tickets.component';
import { MantenedorDiplomasComponent } from './components/mantenedor/contrato/mantenedor-diplomas/mantenedor-diplomas.component';
import { MantenedorEstadosCivilesComponent } from './components/mantenedor/contrato/mantenedor-estados-civiles/mantenedor-estados-civiles.component';
import { MantenedorInstitucionesComponent } from './components/mantenedor/contrato/mantenedor-instituciones/mantenedor-instituciones.component';
import { MantenedorModulosComponent } from './components/mantenedor/contrato/mantenedor-modulos/mantenedor-modulos.component';
import { MantenedorNacionalidadesComponent } from './components/mantenedor/contrato/mantenedor-nacionalidades/mantenedor-nacionalidades.component';
import { MantenedorNivelesResponsabilidadComponent } from './components/mantenedor/contrato/mantenedor-niveles-responsabilidad/mantenedor-niveles-responsabilidad.component';
import { MantenedorNivelesSkillComponent } from './components/mantenedor/contrato/mantenedor-niveles-skill/mantenedor-niveles-skill.component';
import { MantenedorOrigenesComponent } from './components/mantenedor/contrato/mantenedor-origenes/mantenedor-origenes.component';
import { MantenedorPrevisionesAfpComponent } from './components/mantenedor/contrato/mantenedor-previsiones-afp/mantenedor-previsiones-afp.component';
import { MantenedorPrevisionesSaludComponent } from './components/mantenedor/contrato/mantenedor-previsiones-salud/mantenedor-previsiones-salud.component';
import { MantenedorPrioridadesComponent } from './components/mantenedor/contrato/mantenedor-prioridades/mantenedor-prioridades.component';
import { MantenedorProvinciasComponent } from './components/mantenedor/contrato/mantenedor-provincias/mantenedor-provincias.component';
import { MantenedorProyectosComponent } from './components/mantenedor/contrato/mantenedor-proyectos/mantenedor-proyectos.component';
import { MantenedorRegionesComponent } from './components/mantenedor/contrato/mantenedor-regiones/mantenedor-regiones.component';
import { MantenedorSexosComponent } from './components/mantenedor/contrato/mantenedor-sexos/mantenedor-sexos.component';
import { MantenedorSkillsComponent } from './components/mantenedor/contrato/mantenedor-skills/mantenedor-skills.component';
import { MantenedorTiposContratoComponent } from './components/mantenedor/contrato/mantenedor-tipos-contrato/mantenedor-tipos-contrato.component';
import { MantenedorTiposCuentaComponent } from './components/mantenedor/contrato/mantenedor-tipos-cuenta/mantenedor-tipos-cuenta.component';
import { MantenedorTiposFormacionComponent } from './components/mantenedor/contrato/mantenedor-tipos-formacion/mantenedor-tipos-formacion.component';
import { MantenedorTiposInstitucionComponent } from './components/mantenedor/contrato/mantenedor-tipos-institucion/mantenedor-tipos-institucion.component';
import { MantenedorTiposSoporteComponent } from './components/mantenedor/contrato/mantenedor-tipos-soporte/mantenedor-tipos-soporte.component';
import { MantenedorTiposTicketComponent } from './components/mantenedor/contrato/mantenedor-tipos-ticket/mantenedor-tipos-ticket.component';
import { MantenedorTiposOtroFormacionComponent } from './components/mantenedor/contrato/mantenedor-tipos-otro-formacion/mantenedor-tipos-otro-formacion.component';
import { MantenedorUnidadesComponent } from './components/mantenedor/contrato/mantenedor-unidades/mantenedor-unidades.component';
import { MantenedorAreasTicketComponent } from './components/mantenedor/contrato/mantenedor-areas-ticket/mantenedor-areas-ticket.component';
import { MantenedorAreasFuncionalesComponent } from './components/mantenedor/contrato/mantenedor-areas-funcionales/mantenedor-areas-funcionales.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    TicketsComponent,
    RecoveryComponent,
    NewPasswordComponent,
    TicketsCommentsComponent,
    // HTML Sanitizer
    SafeHtmlPipe,
    TicketsNewCommentComponent,
    TicketsDescriptionComponent,
    MantenedorBancosComponent,
    MantenedorCargosComponent,
    MantenedorCarreraComponent,
    MantenedorCentrosCostoComponent,
    MantenedorClientesComponent,
    MantenedorComunasComponent,
    MantenedorDatosActividadComponent,
    MantenedorDificultadTicketsComponent,
    MantenedorDiplomasComponent,
    MantenedorEstadosCivilesComponent,
    MantenedorInstitucionesComponent,
    MantenedorModulosComponent,
    MantenedorNacionalidadesComponent,
    MantenedorNivelesResponsabilidadComponent,
    MantenedorNivelesSkillComponent,
    MantenedorOrigenesComponent,
    MantenedorPrevisionesAfpComponent,
    MantenedorPrevisionesSaludComponent,
    MantenedorPrioridadesComponent,
    MantenedorProvinciasComponent,
    MantenedorProyectosComponent,
    MantenedorRegionesComponent,
    MantenedorSexosComponent,
    MantenedorSkillsComponent,
    MantenedorTiposContratoComponent,
    MantenedorTiposCuentaComponent,
    MantenedorTiposFormacionComponent,
    MantenedorTiposInstitucionComponent,
    MantenedorTiposSoporteComponent,
    MantenedorTiposTicketComponent,
    MantenedorTiposOtroFormacionComponent,
    MantenedorUnidadesComponent,
    MantenedorAreasTicketComponent,
    MantenedorAreasFuncionalesComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG
    ButtonModule,
    RippleModule,
    SplitButtonModule,
    PanelModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    CardModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    EditorModule,
    FileUploadModule,
    InputSwitchModule,
    FieldsetModule,
    TabViewModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    // Http
    HttpClientModule,
  ],
  providers: [
    HelperService,
    MessageService,
    ConfirmationService,
    ValidadorService,
    ColaboradorService,
    TicketService,
    ActividadService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
