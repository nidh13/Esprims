import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TopicsRouting} from './topics.routing';
import {AlertComponent} from '../alerteJumbotron/alert.component';
import {AddTopicComponent} from './addTopic/add-topic.component';
import {ForumTopicsComponent} from './forum-topics/forum-topics.component';
import {SingleTopicComponent} from './single-topic/single-topic.component';
import {GetTopicResolvers} from '../../services/resolvers/get.topic.resolvers';
import {AllTopicsResolver} from '../../services/resolvers/all.topics.resolver';
import {ReactiveFormsModule} from '@angular/forms';
import {GetCommentsResolvers} from '../../services/resolvers/get.comments.resolver';
import {NgxPaginationModule} from 'ngx-pagination';
import {TopicDetailComponent} from './TopicDetail/topic.detail';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TopicsRouting,
        NgxPaginationModule
    ],
  declarations: [
    AddTopicComponent,
    ForumTopicsComponent,
    SingleTopicComponent,
    TopicDetailComponent
  ],
  providers: [
    GetTopicResolvers,
    AllTopicsResolver,
    GetCommentsResolvers
  ]
})
export class TopicsFrontModule { }
