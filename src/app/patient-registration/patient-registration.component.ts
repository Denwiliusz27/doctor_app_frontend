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
  submitted = false;

  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Z][a-z-ąćęįłńóżź]*')
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+(\-[A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+)?$')
    ]),
    email: new FormControl('', [
      Validators.required,
      // Validators.email
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.registrationFormGroup.controls;
  }

  register(): void {
    this.submitted = true;

    if (this.registrationFormGroup.invalid){
      return;
    }

    const patientRegistration: PatientRegistration = {name: this.registrationFormGroup.value.name,
      surname: this.registrationFormGroup.value.surname,
      email: this.registrationFormGroup.value.email,
      password: this.registrationFormGroup.value.password};

    console.log('zarejestrowano');
  }
}
