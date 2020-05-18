import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Event} from '../../models/Event';
import {TopicService} from '../TopicService';
import { Topic } from 'src/app/models/Topic';

@Injectable()
export class AllTopicsResolver implements Resolve<Topic[]> {
  constructor(private tps: TopicService) {}

  // @ts-ignore
  resolve( state: RouterStateSnapshot): Observable<Topic[]> {
    console.log('resolver')
    return this.tps.getAll();
  }

}
