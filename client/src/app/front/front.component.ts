import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServices} from '../services/UserServices';
import {StorageService} from '../services/security/storage.service';
import {Event} from '../models/Event';
import {Topic} from "../models/Topic";

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {
  title = 'argon-dashboard-angular';
  bool = false;

  logged;
  private userLogged: any;


  constructor(private router: Router, private userService: UserServices) {
    if (StorageService.get('currentUser')) {
      this.userLogged = this.userService.decodeToken().user;
    }
    this.showDropdown();
  }


  logout() {
    this.router.navigate(['/']);
    location.reload();
    StorageService.clear('currentUser');
    // tslint:disable-next-line:no-unused-expression
    this.bool === false;
  }

  showDropdown() {
    if (this.bool === false) {
      this.bool = true;
    } else {
      this.bool = false;
    }
  }


  ngOnInit() {
    if (StorageService.get('currentUser')) {
      this.userLogged = this.userService.decodeToken().user;
    }
    this.showDropdown();
  }

  goToLogin() {
    this.bool = false;
    this.router.navigateByUrl('/login');
  }
}
