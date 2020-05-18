import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '../../../node_modules/@angular/common/http';
import {BehaviorSubject, Observable} from '../../../node_modules/rxjs';
import {User} from '../models/User';
import {StorageService} from './security/storage.service';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private currentUserSubject: BehaviorSubject<User>;
  public token: string;
  private loggedUser: string;
  private user;

  constructor(public http: HttpClient) {
  }

  addUser(u: User) {
    console.log(u);
    const body = JSON.stringify(u);
    return this.http.post('http://127.0.0.1:5000/api/users/register', u);
  }
  public auth(email, password): Observable<User> {
    console.log(JSON.stringify(email, password));
    const myData = {email, password};
    return this.http.post<User>('http://127.0.0.1:5000/api/auth', myData);
  }

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http
      // .post(environment.apiEndpoint + '/prisma-crm-web/users/login', body , httpOptions)
      .post('http://127.0.0.1:5000/api/auth', body, httpOptions)
      .pipe(map(objectJson => {
          const response = JSON.parse(objectJson);
          const tooook = response.token;
          // login successful if there's a jwt token in the response
          if (response.token) {

            // store email and jwt token in local storage to keep user logged in between page refreshes
            const expires = 1000 * 60 * 30;
            StorageService.set('currentUser', response.token, expires);
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  decodeToken() {
    const token = StorageService.get('currentUser');
    return jwt_decode(token);
  }

  getIdUserByToken() {
    const token = StorageService.get('currentUser');
    const decoded = jwt_decode(token);
    return decoded.user.id;
  }


}
