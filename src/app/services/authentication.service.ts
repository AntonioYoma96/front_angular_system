import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UserCredentials } from 'src/app/models/users';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private credentialsSubject: BehaviorSubject<any>;
  public credentials: Observable<any>;

  private accessTokenTimeout: any;

  private readonly apiUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;

    const actualStorage = JSON.parse(
      localStorage.getItem('credentials') as string
    );
    this.credentialsSubject = new BehaviorSubject(
      actualStorage ? actualStorage : {}
    );

    this.credentials = this.credentialsSubject.asObservable();
  }

  public get credentialValue(): any {
    return this.credentialsSubject.value;
  }

  login(email: string, password: string): Observable<UserCredentials> {
    return this.http
      .post<UserCredentials>(`${this.apiUrl}/auth/token/`, {
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
    if(lastCredentials){
      this.stopRefreshTokenTimer();
      this.credentialsSubject.next({});
      localStorage.removeItem('credentials');
      return throwError('No existen credenciales registradas en el sistema')
    }
    return this.http
      .post<UserCredentials>(`${this.apiUrl}/auth/token/refresh/`, {
        refresh: lastCredentials.refresh,
      })
      .pipe(
        map((credentials) => {
          lastCredentials.access = credentials.access;
          this.credentialsSubject.next(lastCredentials);
          this.startRefreshTokenTimer();
          return lastCredentials;
        }),
        catchError((err) => {
          let errorMessage: string;
          if (err.error.refresh) {
            errorMessage = 'No existen credenciales registradas en el sistema';
          } else {
            errorMessage = err.error.detail || err.message || err.statusText;
          }
          this.logout();
          return throwError(errorMessage);
        })
      );
  }

  logout(): void {
    this.stopRefreshTokenTimer();
    this.credentialsSubject.next({});
    localStorage.removeItem('credentials');
    console.log(2)
    this.router.navigate(['/login']);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.accessTokenTimeout);
  }

  recoveryPassword(email: string): Observable<any> {
    console.log(email)
    return this.http
      .post<any>(`${this.apiUrl}/auth/request-reset-password/`, {
        email
      })
      .pipe(
        map((data) => {
          console.log(data)
          return data;
        })
      );
  }

  newPassword(userId: string, password: string, password2: string, uidb64: string, token: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/reset-password/${uidb64}/${token}/`, {
        password,
        password2,
        'user_id':userId,
      })
      .pipe(
        map((data) => {
          console.log(data)
          return data;
        })
      );
  }
}
