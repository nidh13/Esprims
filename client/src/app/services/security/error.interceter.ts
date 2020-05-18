import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginService} from './login.service';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403, 404, 500, 501, 502, 503].indexOf(err.status) !== -1) {
        // navigate to login if 401 Unauthorized or 403 Forbidden response returned from api
        this.router.navigate(['/']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
