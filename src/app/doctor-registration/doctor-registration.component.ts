import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

interface DocrtorRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
  city: string;
  address: string;
  phoneNumber: string;
  description: string;
}

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {

  submitted = false;

  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Z][a-z]*')
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Z][a-zA-ZąćęįłńóżźĄĆĘŁŃÓŻŹ ,.\'-]+')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z]{1}([a-z-ąćęįłńóżź]){1,}')
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z]{1}([a-z-ąćęįłńóżź]){1,} [0-9]{1,}[a-zA-Z]{0,1}') // na początek: [u][l][.]
    ]),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{3}')
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

    const doctorRegistration: DocrtorRegistration = {
      name: this.registrationFormGroup.value.name,
      surname: this.registrationFormGroup.value.surname,
      email: this.registrationFormGroup.value.email,
      password: this.registrationFormGroup.value.password,
      city: this.registrationFormGroup.value.city,
      address: this.registrationFormGroup.value.address,
      description: this.registrationFormGroup.value.description,
      phoneNumber: this.registrationFormGroup.value.phoneNumber
    };

    console.log('elo');
  }
}
