import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


interface PatientRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    surname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    console.log('zarejestrowano');
  }
}
