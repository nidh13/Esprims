import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServices} from 'src/app/services/UserServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  public data: any = [];
  errorMessage: string;
  returnUrl = '';

  constructor(private userServices: UserServices, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.returnUrl = decodeURI(this.route.snapshot.queryParams['returnUrl'] || '/');
  }

  ngOnDestroy() {
  }

  Login() {
    this.userServices.login(this.model.email, this.model.password)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (this.userServices.decodeToken().user.role === 'ADMIN' ) {
              this.router.navigateByUrl('/dash/events');
          } else {
              if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.router.navigateByUrl('/');
                location.reload();
              }
          }
        },
        error => console.log(error)
      );
  }
}
