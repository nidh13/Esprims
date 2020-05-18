import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForumTopicsComponent} from './forum-topics/forum-topics.component';
import {AllTopicsResolver} from '../../services/resolvers/all.topics.resolver';
import {AddTopicComponent} from './addTopic/add-topic.component';
import {SingleTopicComponent} from './single-topic/single-topic.component';
import {GetTopicResolvers} from '../../services/resolvers/get.topic.resolvers';
import {GetCommentsResolvers} from '../../services/resolvers/get.comments.resolver';

const routes: Routes = [
  {path: '', component: ForumTopicsComponent, resolve: {topics: AllTopicsResolver}},
  {path: 'add', component: AddTopicComponent},
  {path: 'id/:id', component: SingleTopicComponent, resolve: {topicSelected: GetTopicResolvers, comments: GetCommentsResolvers}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRouting {
}
