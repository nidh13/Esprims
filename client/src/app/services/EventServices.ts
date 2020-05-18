import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventServices {
  constructor(public http: HttpClient) {}

  public addEvent(event): Observable<Event> {
    return this.http.post<Event>('http://127.0.0.1:5000/api/event/add', event);
  }
  public allEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://127.0.0.1:5000/api/event');
  }
  public delete(id): Observable<Event> {
    return this.http.delete<Event>(
      'http://127.0.0.1:5000/api/event/delete/' + id
    );
  }
  public update(event): Observable<Event> {
    return this.http.put<Event>(
      'http://127.0.0.1:5000/api/event/update',
      event
    );
  }
  public getEvent(id): Observable<Event> {
    console.log('getting the Events ' + id);
    return this.http.get<Event>('http://127.0.0.1:5000/api/event/' + id);
  }
}
