import {HomeComponent} from './home/home.component';
import {FrontComponent} from './front.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllTopicsResolver} from '../services/resolvers/all.topics.resolver';
import {AllEventsResolver} from '../services/resolvers/all.events.resolver';
import {AboutComponent} from './About/about.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      {path: '', component: HomeComponent, resolve: {events: AllEventsResolver, topics: AllTopicsResolver}},
      {path: 'about', component: AboutComponent},
      {path: '', loadChildren: '../layouts/auth-layout/auth-layout.module#AuthLayoutModule'},
      {path: 'topics', loadChildren: './Topics/topics.module#TopicsFrontModule'},
      {path: 'events', loadChildren: './Events/events.front.module#EventsFrontModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRouting {
}
