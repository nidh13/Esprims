import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddEventComponent} from './add-event/add-event.component';
import {AllEventsComponent} from './all-events/all-events.component';
import {UpdateEventComponent} from './update-event/update-event.component';

const routes: Routes = [
      {path: '', component: AllEventsComponent},
      {path: 'add', component: AddEventComponent},
      {path: 'update/:id', component: UpdateEventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRouting {
}
