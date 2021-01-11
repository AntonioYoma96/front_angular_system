import { Component } from '@angular/core';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'smartpeople';
  isSidebarCollapse: boolean;
  hideContent: boolean;

  constructor(private sidebarService: SidebarService) {
    this.isSidebarCollapse = false;
    this.hideContent = false;
    this.sidebarService.sideBarCollapseState.subscribe((res) => {
      this.isSidebarCollapse = res;
    });
    this.sidebarService.hideContentState.subscribe((res) => {
      this.hideContent = res;
    });
  }
}
