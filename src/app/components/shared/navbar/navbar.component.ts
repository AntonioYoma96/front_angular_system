import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { MenuItem } from 'primeng-lts/api';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isSidebarCollapsed: boolean;
  currentTitle: string;

  userEmail = '';
  userOptions: MenuItem[];

  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService
  ) {
    this.isSidebarCollapsed = false;
    this.currentTitle = '';

    this.helperService.sidebarStatus.subscribe((res) => {
      this.isSidebarCollapsed = res;
    });
    this.helperService.currentTitle.subscribe((res) => {
      this.currentTitle = res;
    });

    this.userEmail = this.authenticationService.credentialValue.colaborador.nombre;

    this.userOptions = [
      { label: 'Perfil', icon: 'pi pi-user-edit', routerLink: '#' },
      { label: 'Configuración', icon: 'pi pi-cog', routerLink: '#' },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authenticationService.logout();
        },
      },
    ];
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.helperService.toggleSidebar();
  }
}
