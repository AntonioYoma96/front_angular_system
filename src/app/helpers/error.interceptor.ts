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
import { HelperService } from 'src/app/services/helper.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService
  ) {}

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
        let errorMessage;
        if (err.status === 401 && err.url.endsWith('/auth/token/')) {
          errorMessage =
            'El email y/o contraseña no coinciden con cuentas activas en el sistema';
        } else if (
          err.status === 400 &&
          err.url.endsWith('/auth/token/refresh/')
        ) {
          errorMessage = 'No existe credenciales registradas en el sistema';
        } else if (
          err.status === 401 &&
          err.url.endsWith('/auth/token/refresh/')
        ) {
          errorMessage =
            'Las credenciales del sistema han expirado. Por favor reingrese al sistema';
          this.helperService.newErrorMessage('Error del sistema', errorMessage);
        } else if (Object.keys(err.error).length) {
          for (const [key, value] of Object.entries(err.error)) {
            this.helperService.newErrorMessage(`Campo: ${key}`, `${value}`);
          }
          errorMessage = 'Errores en campos inválidos';
        } else {
          errorMessage = err.error.detail || err.message || err.statusText;
          this.helperService.newErrorMessage('Error del sistema', errorMessage);
        }
        return throwError(errorMessage);
      })
    );
  }
}
