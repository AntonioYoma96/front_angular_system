import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  items: Array<any>;
  isSidebarCollapsed: boolean;
  isLargeDevice: boolean;

  constructor(private sidebarService: SidebarService) {
    this.items = [];

    this.isSidebarCollapsed = window.innerWidth < 992;
    this.isLargeDevice = window.innerWidth >= 992;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Inicio', type: 'link', icon: 'pi pi-home' },
      {
        label: 'Registro de Actividades',
        type: 'link',
        icon: 'pi pi-calendar',
      },
      { label: 'Gestión de Tickets', type: 'link', icon: 'pi pi-check-square' },
    ];
    this.sidebarService.sideBarCollapseState.next(this.isSidebarCollapsed);
    this.sidebarService.hideContentState.next(
      !this.isSidebarCollapsed && !this.isLargeDevice
    );
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992) {
      if (!this.isLargeDevice) {
        this.isLargeDevice = !this.isLargeDevice;
        this.sidebarService.hideContentState.next(false);
      }
      if (this.isSidebarCollapsed) {
        this.sidebarToggle();
      }
    } else {
      if (this.isLargeDevice) {
        this.isLargeDevice = !this.isLargeDevice;
      }
      if (!this.isSidebarCollapsed) {
        this.sidebarToggle();
      }
    }
  }

  sidebarToggle(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.sideBarCollapseState.next(this.isSidebarCollapsed);
    this.sidebarService.hideContentState.next(
      !this.isSidebarCollapsed && !this.isLargeDevice
    );
  }
}
