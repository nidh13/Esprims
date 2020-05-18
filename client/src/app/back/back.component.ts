import {Component} from '@angular/core';
import {UserServices} from '../services/UserServices';
import {Router} from '@angular/router';
import {StorageService} from '../services/security/storage.service';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent {
  title = 'back';

  constructor(
    private userService: UserServices,
    private router: Router,
  ) {
    if (StorageService.get('currentUser')) {
      console.log(this.userService.decodeToken().user.role);
    }
  }
}
