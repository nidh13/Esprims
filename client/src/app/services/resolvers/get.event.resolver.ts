import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Event} from '../../models/Event';
import { EventServices } from '../EventServices';

@Injectable()
export class GetEventResolver implements Resolve<Event[]> {
  constructor(private eventServices: EventServices) {}

  // @ts-ignore
  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Event> {
    // @ts-ignore
    return this.eventServices.getEvent(route.paramMap.get('id'))
  }

}