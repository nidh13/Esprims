import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tokens} from '../../models/Tokens';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';

const httpOptions =  {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'}),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public static loggedUserId: number;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiUrl = '/prisma-crm-web/users/login';
  apiUrl2 = 'http://localhost:9080/prisma-crm-web/users/login';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  public token: string;

  static isLogged() {
    return !!StorageService.get('currentUser');
  }

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http
      // .post(environment.apiEndpoint + '/prisma-crm-web/users/login', body , httpOptions)
      .post(this.apiUrl2 , body , httpOptions)
      .pipe(map(objectJson => {
          // console.log(JSON.parse(response));
          const response = JSON.parse(objectJson);
          const tooook = response.token;

          // login successful if there's a jwt token in the response
          const t = response && response['token'];
          if (t && response['status']) {
            // set token property
            this.token = t;

            // store email and jwt token in local storage to keep user logged in between page refreshes
            const expires = 1000 * 60 * 30;
            StorageService.set('currentUser', {token: t}, expires);
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
