import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { PrimeNGConfig } from 'primeng-lts/api';

interface SidebarItemModel {
  label: string;
  route: [string];
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  items: Array<SidebarItemModel>;
  isSidebarCollapsed: boolean;

  constructor(
    private helperService: HelperService,
    private primengConfig: PrimeNGConfig
  ) {
    this.items = [];
    this.isSidebarCollapsed = true;
    this.helperService.sidebarStatus.subscribe((res) => {
      this.isSidebarCollapsed = res;
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = [
      { label: 'Inicio', route: ['/home'], icon: 'pi pi-home' },
      {
        label: 'Actividades',
        route: ['/tickets'],
        icon: 'pi pi-calendar',
      },
      { label: 'Tickets', route: ['#'], icon: 'pi pi-check-square' },
    ];
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 992) {
      if (!this.isSidebarCollapsed) {
        this.toggleSidebar();
      }
    }
  }

  toggleSidebar(): void {
    this.helperService.toggleSidebar();
  }
}
