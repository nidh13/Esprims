import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AllEventsComponent} from './all-events/all-events.component';
import {AddEventComponent} from './add-event/add-event.component';
import {UpdateEventComponent} from './update-event/update-event.component';
import {AuthGuard} from '../../services/security/auth.guard';
import {FormsModule} from '@angular/forms';
import {EventsRouting} from './events.routing';
import {ImageUploadModule} from '../../SharedComponent/image-upload/image-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventsRouting,
    ImageUploadModule,
  ],
  declarations: [
    AddEventComponent,
    AllEventsComponent,
    UpdateEventComponent,
  ],
  providers: [AuthGuard]
})
export class EventsModule { }
