import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


interface DoctorLogin {
  email: string;
  password: string;

}

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  submitted = false;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    console.log(this.loginFormGroup.controls.email.errors);
    return this.loginFormGroup.controls;
  }

  login(): void {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    const doctorLogin: DoctorLogin = {email: this.loginFormGroup.value.email, password: this.loginFormGroup.value.password};

    console.warn(this.loginFormGroup.value);
    console.log('kliknięto');
  }

  redirect(): void {
    console.log('elo'); /* przekierowanie do rejestracji */
  }
}
