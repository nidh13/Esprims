
import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {EventService} from '../managers/event.service';
import {Event} from '../../models/Event';
import {TopicService} from '../TopicService';

@Injectable()
export class GetCommentsResolvers implements Resolve<Event[]> {
  constructor(private tps: TopicService) {}

  // @ts-ignore
  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Event[]> {
    // @ts-ignore
    return this.tps.commentsByTopicId(route.paramMap.get('id'));
  }

}
