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

// Services
import { HelperService } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { TicketService } from 'src/app/services/api/ticket.service';
import { ActividadService } from 'src/app/services/api/actividad.service';

// Initializer
import { appInitializer } from 'src/app/helpers/appInitializer';

// Interceptors
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';

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
// PrimeNG services
import { MessageService } from 'primeng-lts/api';
import { RecoveryComponent } from './components/auth/recovery/recovery.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';

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
    // Http
    HttpClientModule,
  ],
  providers: [
    HelperService,
    MessageService,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
