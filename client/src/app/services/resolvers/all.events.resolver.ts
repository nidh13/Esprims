import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Event} from '../../models/Event';
import { EventServices } from '../EventServices';

@Injectable()
export class AllEventsResolver implements Resolve<Event> {
  constructor(private eventService: EventServices) {}

   // @ts-ignore
   resolve( state: RouterStateSnapshot): Observable<Event[]> {
    return this.eventService.allEvents();
  }

}
