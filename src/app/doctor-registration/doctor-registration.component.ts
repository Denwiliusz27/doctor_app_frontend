import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DoctorRegistrationService} from "../services/doctor-registration.service";
import {Router} from '@angular/router';
import {CitiesService, City} from '../services/cities.service';
import {Observable} from 'rxjs';
import {Specialization, SpecializationService} from '../services/specialization.service';
import {Service, ServiceService} from '../services/service.service';

export interface DoctorRegistrationModel {
  doctorName: string;
  doctorSurname: string;
  doctorEmailAddress: string;
  doctorPassword: string;
  specializationId: number;
  cityId: number;
  doctorAddress: string;
  phoneNr: string;
  description: string;
  doctorPicture: Blob;
}

interface DoctorService {
  id: number;
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
  services: Observable<Service[]>;
  specializations: Observable<Specialization[]> = this.specializationService.getSpecializations();
  selectedSpecializationId: number;
  selectedServices: DoctorService[] = [];
  cities: Observable<City[]> = this.cityService.getCities();
  selectedCityId: number;
  imageFile = null;

  doctor: DoctorRegistrationModel;


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

  constructor(private serviceService: ServiceService, private specializationService: SpecializationService,
              private cityService: CitiesService, private readonly doctorRegistrationService: DoctorRegistrationService,
              private router: Router) {
    cityService.getCities();
  }

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

      const doctorRegistration: DoctorRegistrationModel = this.prepareDoctorObject();
      this.doctorRegistrationService.addDoctor(doctorRegistration);

      console.log('email: ' + doctorRegistration.doctorEmailAddress);
      let doctor: DoctorRegistrationModel;
      this.getDoctorByDoctorEmailAddress(doctorRegistration.doctorEmailAddress).subscribe(doctor =>  = );





      // this.router.navigateByUrl('/doktor-strona-główna');
      console.log(doctorRegistration);
    } else {
      console.log('!!!nie jest git?');
      console.log(this.registrationFormGroup.valid);
      console.log(!this.isServiceFormValid());
    }
  }

  prepareDoctorObject(): DoctorRegistrationModel {
    this.selectedServices = this.selectedServices.filter(service => service.isChosen === true);
    return {
      doctorName: this.registrationFormGroup.value.name,
      doctorSurname: this.registrationFormGroup.value.surname,
      doctorEmailAddress: this.registrationFormGroup.value.email,
      doctorPassword: this.registrationFormGroup.value.password,
      specializationId: this.selectedSpecializationId,
      cityId: this.selectedCityId,
      doctorAddress: this.registrationFormGroup.value.address,
      description: this.registrationFormGroup.value.description,
      phoneNr: this.registrationFormGroup.value.phoneNumber,
      doctorPicture: null // this.imageFile
    };
  }

  getDoctorByDoctorEmailAddress(email: string): Observable<DoctorRegistrationModel>{
    return this.doctorRegistrationService.getDoctorByEmailAddress(email);
  }

  onSelectSpecialization(specializationName: string): void {
    this.selectedServices = [];
    console.log(this.selectedSpecializationId);
    this.services = this.serviceService.getServicesBySpecializationId(this.selectedSpecializationId);
    // this.selectedSpecializationId = specializationName;
    // this.uncheckAllServices();
  }

  addService(serviceId: number, isChosen: boolean): void {
    const currentService = this.selectedServices.find(service => service.id === serviceId); // return service or undefined
    if (isChosen){
      if (currentService === undefined) {
        this.selectedServices.push({id: serviceId, price: 0, isChosen: true});
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

  onPriceInput(serviceId: number, price: number): void {
    const currentService = this.selectedServices.find(service => service.id === serviceId);
    if (currentService) {
      if (price.toString() === '' && (currentService.isChosen === true)) {
        currentService.price = 0;
      } else {
        currentService.price = Number(price);
      }
    } else {
      const newService = {id: serviceId, price: Number(price), isChosen: false};
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

  onSelectCity(selectedCity: any): void {
    console.log(this.selectedCityId);
  }

  isCitySelected(): boolean {
    if (this.selectedCityId === undefined) {
      return true;
    } else {
      return false;
    }
  }

  isSpecializationSelected(): boolean {
    if (this.selectedSpecializationId === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
