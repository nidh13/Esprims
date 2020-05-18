import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServices} from '../../services/UserServices';
import {User} from '../../models/User';
import {MustMatch} from "./MustMatch";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  imageURL = 'user.png';
  u: User;
  myRecaptcha: boolean;

  constructor(private registerService: UserServices,
              private formBuilder: FormBuilder,
              private router: Router) {
  }
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.u = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      'CLIENT');
    console.log(this.u, 'this.u');
    this.registerService.addUser(this.u)
      .subscribe(
        response => {
          console.log(response, 'response');
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );

  }
}
