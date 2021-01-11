import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

interface NavBarItems {
  label: string;
  type: string;
  icon: string;
  items: Array<NavBarItems>;
}

@Component({
  selector: 'app-sidebar-buttons',
  templateUrl: './sidebar-buttons.component.html',
  styleUrls: ['./sidebar-buttons.component.css'],
})
export class SidebarButtonsComponent implements OnInit {
  @Input() items: Array<NavBarItems>;
  @Input() margin: string;
  isSidebarCollapsed: boolean;

  constructor(private sidebarService: SidebarService) {
    this.items = [];
    this.margin = '0';
    this.isSidebarCollapsed = false;
    this.sidebarService.sideBarCollapseState.subscribe((res) => {
      this.isSidebarCollapsed = res;
    });
  }

  ngOnInit(): void {}
}
