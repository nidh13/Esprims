import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRouting } from './back.routing';
import { BackComponent } from './back.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutModule } from './dashboardLayout/dashboard.layout.module';
import {AuthGuard} from '../services/security/auth.guard';
import {FormsModule} from '@angular/forms';
import {AllTopicsComponent} from './Topics/all.topics.component';
import {TopicService} from '../services/TopicService';
import {EventsModule} from './Events/events.module';

@NgModule({
  imports: [
    CommonModule,
    BackRouting,
    DashboardLayoutModule,
    FormsModule,
    EventsModule
  ],
  declarations: [
    BackComponent,
    DashboardComponent,
    AllTopicsComponent,
  ],
  providers: [AuthGuard, TopicService]
})
export class BackModule { }
