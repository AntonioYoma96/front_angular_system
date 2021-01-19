import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'smartpeople';
  isSidebarCollapse: boolean;
  usuarioActual = '';

  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService
  ) {
    this.isSidebarCollapse = false;
    this.helperService.sidebarStatus.subscribe((res) => {
      this.isSidebarCollapse = res;
    });
    this.authenticationService.credentials.subscribe((res) => {
      this.usuarioActual = res ? res.user_email : '';
    });
  }

  toggleSidebar(): void {
    this.helperService.toggleSidebar();
  }
}
