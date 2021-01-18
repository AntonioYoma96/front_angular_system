import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          [401, 403].includes(err.status) &&
          this.authenticationService.credentialValue
        ) {
          this.authenticationService.logout();
        }
        if (!environment.production) {
          console.error(err);
        }
        let error;
        if (err.status === 401) {
          error =
            'El email y/o contraseña no coinciden con cuentas activas en el sistema';
        } else {
          error = err.error.detail || err.message || err.statusText;
        }
        return throwError(error);
      })
    );
  }
}
