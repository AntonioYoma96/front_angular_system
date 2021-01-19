// Angular core
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular configs
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular project files
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { HelperService } from './services/helper.service';
import { AuthenticationService } from './services/authentication.service';

// Interceptors
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// PrimeNG modules
import { ButtonModule } from 'primeng-lts/button';
import { RippleModule } from 'primeng-lts/ripple';
import { SplitButtonModule } from 'primeng-lts/splitbutton';
import { PanelModule } from 'primeng-lts/panel';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ToastModule } from 'primeng-lts/toast';
// PrimeNG services
import { MessageService } from 'primeng-lts/api';
import { appInitializer } from 'src/app/helpers/appInitializer';
import { TicketsComponent } from './components/tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    TicketsComponent,
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
    // Http
    HttpClientModule,
  ],
  providers: [
    HelperService,
    MessageService,
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
