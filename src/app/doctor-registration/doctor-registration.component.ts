import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DoctorRegistrationService} from "../services/doctor-registration.service";

interface DoctorRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
  specialization: string;
  services: DoctorService[];
  city: string;
  address: string;
  phoneNumber: string;
  description: string;
  image: File;
}

interface DoctorService {
  name: string;
  price: number;
  isChosen?: boolean;
}

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})

export class DoctorRegistrationComponent implements OnInit {
  submitted = false;
  services: string[];
  specializations: string[] = ['kardiolog', 'dentysta'];
  selectedSpecialization: string;
  selectedServices: DoctorService[] = [];
  cities: string[] = ['Kraków', 'Warszawa', 'Gdańsk'];
  selectedCity: string;
  imageFile = null;

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
      // Validators.required
    ]),
    services: new FormControl('', [
      // this.isChosen()
    ]),
    city: new FormControl('', [
      /*Validators.required,
      Validators.pattern('^[A-Z][a-ząćęįłńóżź]+(\-[A-ZĄĆĘŁŃÓŻŹ][a-ząćęįłńóżź]+)?$')*/
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
      Validators.required
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
    this.registrationFormGroup.updateValueAndValidity();

    if ((this.registrationFormGroup.valid && !this.isServiceFormValid()) === true){
      console.log('w ifie - jest git');
      console.log(this.registrationFormGroup.valid);
      console.log(!this.isServiceFormValid());

      const doctorRegistration = this.prepareDoctorObject();
      console.log(doctorRegistration);
    } else {
      console.log('!!!nie jest git?');
      console.log(this.registrationFormGroup.valid);
      console.log(!this.isServiceFormValid());
    }
  }

  prepareDoctorObject(): DoctorRegistration {
    this.selectedServices = this.selectedServices.filter(service => service.isChosen === true);
    return {
      name: this.registrationFormGroup.value.name,
      surname: this.registrationFormGroup.value.surname,
      email: this.registrationFormGroup.value.email,
      password: this.registrationFormGroup.value.password,
      specialization: this.selectedSpecialization,
      services: this.selectedServices,
      city: this.selectedCity,
      address: this.registrationFormGroup.value.address,
      description: this.registrationFormGroup.value.description,
      phoneNumber: this.registrationFormGroup.value.phoneNumber,
      image: this.imageFile
    };
  }

  onSelectSpecialization(specializationName: string): void {
    this.selectedServices = [];
    this.services = this.doctorRegistrationService.getServicesBySpecialization(specializationName);
    this.selectedSpecialization = specializationName;
    this.uncheckAllServices();
  }

  addService(serviceName: string, isChosen: boolean): void {
    const currentService = this.selectedServices.find(service => service.name === serviceName); // return service or undefined
    if (isChosen){
      if (currentService === undefined) {
        this.selectedServices.push({name: serviceName, price: 0, isChosen: true});
      } else {
        currentService.isChosen = true;
      }
    } else {
      if (currentService !== undefined) {
        currentService.isChosen = false;
      }
    }
    console.log(this.selectedServices);
  }

  uploadImage(event): void {
    this.imageFile = event.target.files[0];
  }

  onPriceInput(serviceName: string, price: number): void {
    const currentService = this.selectedServices.find(service => service.name === serviceName);
    if (currentService) {
      if (price.toString() === '' && (currentService.isChosen === true)) {
        currentService.price = 0;
      } else {
        currentService.price = Number(price);
      }
    } else {
      const newService = {name: serviceName, price: Number(price), isChosen: false};
      this.selectedServices.push(newService);
    }
  }

  isServiceFormValid(): boolean {
    if (this.noServiceChecked() || this.isPriceZero() || this.isPriceNegative()) {
      return true;
    }
    return false;
  }

  noServiceChecked(): boolean {
    const currentService =  this.selectedServices.find(service => service.isChosen === true);
    if (currentService === undefined) {
      return true;
    } else {
      return false;
    }
  }

  isPriceZero(): boolean {
    const currentService =  this.selectedServices.find(service => service.price === 0);
    if (currentService === undefined) {
      return false;
    } else {
      if (currentService.isChosen === true){
        return true;
      }
      return false;
    }
  }

  isPriceNegative(): boolean {
    const currentService =  this.selectedServices.find(service => service.price < 0);
    if (currentService === undefined) {
      return false;
    } else {
      if (currentService.isChosen === true){
        return true;
      }
      return false;
    }
  }

  @ViewChildren('serviceCheckboxes') checkboxes: QueryList<ElementRef>;
  @ViewChildren('priceInputs') priceCheckboxes: QueryList<ElementRef>;
  uncheckAllServices(): void {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.priceCheckboxes.forEach((element) => {
      element.nativeElement.value = 0;
    });
  }

  onSelectCity(selectedCity: string): void {
    this.selectedCity = selectedCity;
  }

  isCitySelected(): boolean {
    if (this.selectedCity === undefined) {
      return true;
    } else {
      return false;
    }
  }

  isSpecializationSelected(): boolean {
    if (this.selectedSpecialization === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
