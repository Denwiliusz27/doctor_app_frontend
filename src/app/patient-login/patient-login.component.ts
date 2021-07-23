import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

interface PatientLogin {
  patientEmailAddress: string;
  patientPassword: string;
}


@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})

export class PatientLoginComponent implements OnInit {
  submitted = false;
  emailExist = true;
  passwordCorrect = true;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginFormGroup.controls;
  }

  login(): void {
    this.submitted = true;

    const patientLogin: PatientLogin = this.preparePatientLoginObject();
    if (this.loginFormGroup.valid) {
      console.log('validacja ok');

    } else {
    }
  }

  preparePatientLoginObject(): PatientLogin{
    return {
      patientEmailAddress: this.loginFormGroup.value.email,
      patientPassword: this.loginFormGroup.value.password
    };
  }

  redirect(): void {
    this.router.navigateByUrl('/pacjent-rejestracja');
  }

}
