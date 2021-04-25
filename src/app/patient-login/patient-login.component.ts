import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


interface PatientLogin {
  email: string;
  password: string;

}


@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {
  submitted = false;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginFormGroup.controls;
  }

  login(): void {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    const patientLogin: PatientLogin = {email: this.loginFormGroup.value.email, password: this.loginFormGroup.value.password};

    console.log('kliknięto');
  }

  redirect(): void {
    console.log('elo'); /* przekierowanie do rejestracji */
  }
}
