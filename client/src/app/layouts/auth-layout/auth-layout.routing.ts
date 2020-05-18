import {Routes} from '@angular/router';

import {LoginComponent} from '../../pages/login/login.component';
import {RegisterComponent} from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
  {path: 'login', component: LoginComponent, /*canActivate: [AuthGuard]*/},
  {path: 'register', component: RegisterComponent}
];
