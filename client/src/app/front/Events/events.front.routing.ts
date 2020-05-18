import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingleEventComponent} from './single-event/single-event.component';
import {GetEventResolver} from '../../services/resolvers/get.event.resolver';
import {EventsComponent} from './events/events.component';
import {AllEventsResolver} from '../../services/resolvers/all.events.resolver';

const routes: Routes = [
  {path: '', component: EventsComponent, resolve: {events: AllEventsResolver}},
  {path: 'id/:id', component: SingleEventComponent, resolve: {eventSelected: GetEventResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsFrontRouting {
}
