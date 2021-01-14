// Angular core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular configs
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular project files
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Services
import { HelperService } from './services/helper.service';

// PrimeNG modules
import { ButtonModule } from 'primeng-lts/button';
import { RippleModule } from 'primeng-lts/ripple';
import { SplitButtonModule } from 'primeng-lts/splitbutton';

@NgModule({
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    SplitButtonModule,
  ],
  providers: [HelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
