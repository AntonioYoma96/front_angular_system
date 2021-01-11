// Angular core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular configs
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular project files
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarButtonsComponent } from './components/shared/sidebar-buttons/sidebar-buttons.component';

// PrimeNG modules
import { ButtonModule } from 'primeng-lts/button';
import { RippleModule } from 'primeng-lts/ripple';
import { SidebarService } from './services/sidebar.service';

@NgModule({
  declarations: [AppComponent, SidebarComponent, SidebarButtonsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [SidebarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
