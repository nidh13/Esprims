import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export  class  AuthIntercepter implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('currentUser')) {
      const objJson = JSON.parse(localStorage.getItem('currentUser'));
      const token = objJson.data['token'];
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return  next.handle(cloned);
      } else {return next.handle(req);}
    } else {
      this.router.navigate(['/login']);
      return next.handle(req);
    }
  }

}
