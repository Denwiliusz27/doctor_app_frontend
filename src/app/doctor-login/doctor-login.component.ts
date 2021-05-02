import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


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
      // Validators.email
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor(private router: Router) {
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

    const doctorLogin: DoctorLogin = {email: this.loginFormGroup.value.email, password: this.loginFormGroup.value.password};

    console.log('kliknięto');
  }

  redirect(): void {
    this.router.navigateByUrl('/doktor-rejestracja');
  }
}
