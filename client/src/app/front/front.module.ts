import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontRouting } from './front.routing';
import { HomeComponent } from './home/home.component';
import { FrontComponent } from './front.component';
import {GetCommentsResolvers} from '../services/resolvers/get.comments.resolver';
import {UserServices} from '../services/UserServices';
import {AlertComponent} from './alerteJumbotron/alert.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TopicsFrontModule} from './Topics/topics.module';
import {EventsFrontModule} from './Events/events.front.module';
import {AboutComponent} from './About/about.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FrontRouting,
    TopicsFrontModule,
    EventsFrontModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    FrontComponent,
    AlertComponent,
    HomeComponent,
    AboutComponent,
  ],
  providers: [
    GetCommentsResolvers,
    UserServices,
  ]
})
export class FrontModule { }
