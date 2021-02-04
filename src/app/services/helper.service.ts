import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ErrorMessage {
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class HelperService {
  private sidebarSubject: BehaviorSubject<boolean>;
  public sidebarStatus: Observable<boolean>;

  private currentTitleSubject: BehaviorSubject<string>;
  public currentTitle: Observable<string>;

  private errorMessageSubject: BehaviorSubject<ErrorMessage>;
  public errorMessage: Observable<ErrorMessage>;

  constructor() {
    this.sidebarSubject = new BehaviorSubject<boolean>(window.innerWidth < 992);
    this.sidebarStatus = this.sidebarSubject.asObservable();

    this.currentTitleSubject = new BehaviorSubject<string>('Título');
    this.currentTitle = this.currentTitleSubject.asObservable();

    this.errorMessageSubject = new BehaviorSubject<ErrorMessage>({
      title: '',
      body: '',
    });
    this.errorMessage = this.errorMessageSubject.asObservable();
  }

  toggleSidebar(): void {
    this.sidebarSubject.next(!this.sidebarSubject.value);
  }

  resetSidebar(): void {
    this.sidebarSubject.next(window.innerWidth < 992);
  }

  newTitle(title: string): void {
    this.currentTitleSubject.next(title);
  }

  newErrorMessage(newTitle: string, newBody: string): void {
    this.errorMessageSubject.next({ title: newTitle, body: newBody });
  }

  cleanErrorMessage(): void {
    this.errorMessageSubject.next({ title: '', body: '' });
  }
}
