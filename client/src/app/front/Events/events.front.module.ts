import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsFrontRouting} from './events.front.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from '../alerteJumbotron/alert.component';
import {EventsComponent} from './events/events.component';
import {SingleEventComponent} from './single-event/single-event.component';
import {GetEventResolver} from '../../services/resolvers/get.event.resolver';
import {AllEventsResolver} from '../../services/resolvers/all.events.resolver';
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
    imports: [
        CommonModule,
        EventsFrontRouting,
        NgxPaginationModule,
    ],
  declarations: [
    EventsComponent,
    SingleEventComponent,
  ],
  providers: [
    GetEventResolver,
    AllEventsResolver
  ]
})
export class EventsFrontModule { }
