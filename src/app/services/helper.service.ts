import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HelperService {
  private sidebarSubject: BehaviorSubject<boolean>;
  public sidebarStatus: Observable<boolean>;

  private currentTitleSubject: BehaviorSubject<string>;
  public currentTitle: Observable<string>;

  constructor() {
    this.sidebarSubject = new BehaviorSubject<boolean>(window.innerWidth < 992);
    this.sidebarStatus = this.sidebarSubject.asObservable();

    this.currentTitleSubject = new BehaviorSubject<string>('Título');
    this.currentTitle = this.currentTitleSubject.asObservable();
  }

  toggleSidebar(): void {
    this.sidebarSubject.next(!this.sidebarSubject.value);
  }

  newTitle(title: string): void {
    this.currentTitleSubject.next(title);
  }
}
