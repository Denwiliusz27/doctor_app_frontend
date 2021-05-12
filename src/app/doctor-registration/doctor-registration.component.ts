import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorRegistrationService} from "../services/doctor-registration.service";

interface DocrtorRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
  specialization: string;
  services: string[];
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
  disableSelect = new FormControl(false);
  submitted = false;
  services: string[] = ['konsultacja', 'badanie', 'testy', 'proby  wysilkowe', 'alergeny'];
  specializations: string[] = ['kardiolog', 'dentysta'];

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
     // Validators.email(),
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    specialization: new FormControl('', [
      Validators.required
    ]),
    services: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z][a-ząćęįłńóżź]+(\-[A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+)?$')
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+(\-[A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+)? ){1,}' +
        '[0-9]{1,}(\/[0-9]{1,})*[a-zA-Z]{0,1}') // na początek: [u][l][.]
    ]),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{3}')
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl()
  });

  constructor(private readonly doctorRegistrationService: DoctorRegistrationService) { }

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
      specialization: this.registrationFormGroup.value.specialization,
      services: this.registrationFormGroup.value.services,
      city: this.registrationFormGroup.value.city,
      address: this.registrationFormGroup.value.address,
      description: this.registrationFormGroup.value.description,
      phoneNumber: this.registrationFormGroup.value.phoneNumber
    };

    console.log(doctorRegistration);
  }

  onChange(value: string) {
    this.services = this.doctorRegistrationService.getServicesBySpecialization(value);
    console.log(value);
  }
}
