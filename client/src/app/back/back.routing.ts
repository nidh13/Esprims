import {BackComponent} from './back.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AllTopicsComponent} from './Topics/all.topics.component';
import {RoleAdminGuard} from '../services/security/role.guard';

const routes: Routes = [
  {
    path: 'dash',
    component: BackComponent,
    canActivateChild: [RoleAdminGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'events', loadChildren: './Events/events.module#EventsModule'},
      {path: 'topics', component: AllTopicsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRouting {
}
