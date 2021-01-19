import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserCredentials } from 'src/app/models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private credentialsSubject: BehaviorSubject<any>;
  public credentials: Observable<any>;

  private accessTokenTimeout: any;

  constructor(private http: HttpClient, private router: Router) {
    const actualStorage = JSON.parse(
      localStorage.getItem('credentials') as string
    );
    if (actualStorage) {
      this.credentialsSubject = new BehaviorSubject<any>(actualStorage);
    } else {
      this.credentialsSubject = new BehaviorSubject<any>(null);
    }
    this.credentials = this.credentialsSubject.asObservable();
  }

  public get credentialValue(): any {
    return this.credentialsSubject.value;
  }

  login(email: string, password: string): Observable<UserCredentials> {
    return this.http
      .post<UserCredentials>(`${environment.apiUrl}/auth/token/`, {
        email,
        password,
      })
      .pipe(
        map((credentials) => {
          this.credentialsSubject.next(credentials);
          localStorage.setItem('credentials', JSON.stringify(credentials));
          this.startRefreshTokenTimer();
          return credentials;
        })
      );
  }

  private startRefreshTokenTimer(): void {
    const accessToken = JSON.parse(
      atob(this.credentialValue.access.split('.')[1])
    );
    const expires = new Date(accessToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.accessTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  refreshToken(): any {
    const lastCredentials = this.credentialValue ? this.credentialValue : '';

    return this.http
      .post<UserCredentials>(`${environment.apiUrl}/auth/token/refresh/`, {
        refresh: lastCredentials.refresh,
      })
      .pipe(
        map((credentials) => {
          lastCredentials.access = credentials.access;
          this.credentialsSubject.next(lastCredentials);
          this.startRefreshTokenTimer();
          return lastCredentials;
        })
      );
  }

  logout(): void {
    this.stopRefreshTokenTimer();
    this.credentialsSubject.next(null);
    localStorage.removeItem('credentials');
    this.router.navigate(['/login']);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.accessTokenTimeout);
  }
}
