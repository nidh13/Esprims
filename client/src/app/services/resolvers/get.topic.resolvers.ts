import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {EventService} from '../managers/event.service';
import {Event} from '../../models/Event';
import {TopicService} from '../TopicService';
import {Topic} from '../../models/Topic';

@Injectable()
export class GetTopicResolvers implements Resolve<Topic> {
  constructor(private sv: TopicService) {}

  // @ts-ignore
  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Topic> {
    // @ts-ignore
    return this.sv.getById(route.paramMap.get('id'));
  }

}
