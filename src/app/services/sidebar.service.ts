import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  public sideBarCollapseState = new Subject<boolean>();
  public hideContentState = new Subject<boolean>();

  constructor() {}
}
