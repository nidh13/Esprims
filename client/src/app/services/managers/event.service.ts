import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Event} from '../../models/Event';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable()
export class EventService {
  findUser = 'http://localhost:5000/prisma-crm-web/users/';

  constructor(private http: HttpClient) {
  }
  getAllEvents() {
    return this.http.get<Event[]>(this.findUser + '/');
  }
  getEventById(id: number) {
    return this.http.get<Event[]>(this.findUser + '/' + id);
  }
}
