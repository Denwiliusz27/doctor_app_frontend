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
  services: string[] = ['konsultacja', 'badanie', 'testy', 'proby  wysilkowe', 'alergeny'];
  specializations: string[] = ['kardiolog', 'dentysta'];
  chosenServices: DoctorService[] = [];
  imageFile = null;
  chosenSpecialization: string = this.specializations[0];

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
    this.chosenServices = this.chosenServices.filter(service => service.isChosen === true);
    return {
      name: this.registrationFormGroup.value.name,
      surname: this.registrationFormGroup.value.surname,
      email: this.registrationFormGroup.value.email,
      password: this.registrationFormGroup.value.password,
      specialization: this.chosenSpecialization,
      services: this.chosenServices,
      city: this.registrationFormGroup.value.city,
      address: this.registrationFormGroup.value.address,
      description: this.registrationFormGroup.value.description,
      phoneNumber: this.registrationFormGroup.value.phoneNumber,
      image: this.imageFile
    };
  }

  onSelectSpecialization(specializationName: string): void {
    this.chosenServices = [];
    this.services = this.doctorRegistrationService.getServicesBySpecialization(specializationName);
    this.chosenSpecialization = specializationName;
    console.log(this.chosenServices);
    this.uncheckAllServices();
  }

  addService(serviceName: string, isChosen: boolean): void {
    const currentService = this.chosenServices.find(service => service.name === serviceName); // return service or undefined
    if (isChosen){
      if (currentService === undefined) {
        this.chosenServices.push({name: serviceName, price: 0, isChosen: true});
      } else {
        currentService.isChosen = true;
      }
    } else {
      if (currentService !== undefined) {
        currentService.isChosen = false;
      }
    }
    console.log(this.chosenServices);
  }

  uploadImage(event): void {
    this.imageFile = event.target.files[0];
    // console.log(this.imageFile);
  }

  onPriceInput(serviceName: string, price: number) {
    const currentService = this.chosenServices.find(service => service.name === serviceName);
    if (currentService) {
      if (price.toString() === '' && (currentService.isChosen === true)) {
        currentService.price = 0;
        console.log('jestem zerem');
      } else {
        currentService.price = Number(price);
      }
    } else {
      const newService = {name: serviceName, price: Number(price), isChosen: false};
      this.chosenServices.push(newService);
    }
  }

  isServiceFormValid(): boolean {
    if (this.noServiceChecked()) {
      return true;
    }
    if (this.isPriceZero()) {
      return true;
    }
    if (this.isPriceNegative()) {
      return true;
    }
    return false;
  }

  noServiceChecked(): boolean {
    // console.log(this.chosenServices);
    // console.log(this.chosenServices.find(service => service.isChosen === true));
    const currentService =  this.chosenServices.find(service => service.isChosen === true);
    if (currentService === undefined) {
      return true;
    } else {
      return false;
    }
  }

  isPriceZero(): boolean {
    const currentService =  this.chosenServices.find(service => service.price === 0);
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
    const currentService =  this.chosenServices.find(service => service.price < 0);
    if (currentService === undefined) {
      return false;
    } else {
      return true;
    }
  }

  @ViewChildren('serviceCheckboxes') checkboxes: QueryList<ElementRef>;
  @ViewChildren('priceInputs') priceCheckboxes: QueryList<ElementRef>;

  uncheckAllServices() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.priceCheckboxes.forEach((element) => {
      element.nativeElement.value = 0;
    });
  }
/*
  isPriceInputEmpty(value: string): boolean {
    console.log(value);
    if (value === '') {
      console.log('jestem pusty i nic ci do tego');
      return true;
    } else {
      return false;
    }
  }*/
}
