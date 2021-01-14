import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'smartpeople';
  isSidebarCollapse: boolean;

  constructor(private helperService: HelperService) {
    this.isSidebarCollapse = false;
    this.helperService.sidebarStatus.subscribe((res) => {
      this.isSidebarCollapse = res;
    });
  }

  toggleSidebar(): void {
    this.helperService.toggleSidebar();
  }
}
