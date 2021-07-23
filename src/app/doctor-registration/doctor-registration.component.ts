import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CitiesService, City} from '../services/cities.service';
import {Observable} from 'rxjs';
import {Specialization, SpecializationService} from '../services/specialization.service';
import {Service, ServiceService} from '../services/service.service';
import {DoctorService, DoctorServiceService} from '../services/doctor-service.service';
import {coerceNumberProperty} from '@angular/cdk/coercion';

/*
Reprezentuje obiekt lekarza z bd
 */
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

/*
Reprezentuje usługę z opłatą za nią. isChosen ustawiane na true jeśli została wybrana na stronie
 */
export interface SelectedServices {
  id: number;
  price: number;
  isChosen?: boolean;
}


@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})

/*
Służy do rejestracji i utworzenia konta dla lekarza
 */
export class DoctorRegistrationComponent implements OnInit {
  submitted = false;
  services: Observable<Service[]>; // lista usług dla danej specjalizacji
  specializations: Observable<Specialization[]> = this.specializationService.getSpecializations(); // lista specjalizacji
  selectedSpecializationId: number; // id wybranej specjalizacji przez lekarza
  selectedServices: SelectedServices[] = [];  // lista wybranych usług przez lekarza
  cities: Observable<City[]> = this.cityService.getCities(); // lista miast
  selectedCityId: number; // id wybranego miasta
  imageFile = null;
  emailExists = false; // zmienna do sprawdzenia czy konto o wpisanym mailu już istnieje w bd
  displayForms = false;

  doctor: DoctorRegistrationModel;  // obiekt doktora

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
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    specialization: new FormControl('', [
    ]),
    services: new FormControl('', [
    ]),
    city: new FormControl('', [
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
              private cityService: CitiesService, private router: Router) {
    cityService.getCities();
  }

  ngOnInit(): void {
  }
  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.registrationFormGroup.controls;
  }

  /*
  Służy do rejestracji lekarza i utworzenia dla niego konta.

  Jeśli wszystkie wymagane pola zostały wypełnione we właściwy sposób, zostaje utworzony obiekt doktora. Nastepnie sprawdzane jest,
  czy dla podanego maila istnieje już konto - jeśli nie, konto zostaje utworzone
   */
  register(): void {
    this.submitted = true;
    this.registrationFormGroup.updateValueAndValidity();

    if ((this.registrationFormGroup.valid && !this.isServiceFormValid()) === true) {
      console.log('w ifie - jest git');
      console.log(this.registrationFormGroup.valid);
      console.log(!this.isServiceFormValid());

      const doctorRegistration: DoctorRegistrationModel = this.prepareDoctorObject();

    } else {
      const doctorRegistration: DoctorRegistrationModel = this.prepareDoctorObject();
      console.log('!!!nie jest git?');
      console.log(this.registrationFormGroup.valid);
      console.log(!this.isServiceFormValid());
    }
  }

  /*
  Tworzy obiekt doktora.

  W selectedSerwices znajdą się te uslugi, które zostały wybrane (isCHosen = true)
   */
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

  /*
  SPrawdza czy konto o podanym emailu juz istnieje.
  Jeśli nie, tworzy nowe konto w bd i przekierowuje na stronę
   */

  /*
  Przy zmianie specjalizacji, nadpisuje selectedSpecializationId i wyzerowuje liste wybranych wcześniej usług
   */
  onSelectSpecialization(): void {
    this.selectedServices = [];
    console.log(this.selectedSpecializationId);
    this.services = this.serviceService.getServicesBySpecializationId(this.selectedSpecializationId);
    // this.selectedSpecializationId = specializationName;
    // this.uncheckAllServices();
  }

  /*
  Dodaje usługę do listy wybranych usług
   */
  addService(serviceId: number, isChosen: boolean): void {
    const currentService = this.selectedServices.find(service => service.id === serviceId); // return service or undefined
    if (isChosen) {
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

  /*
  Dodaje zdjęcie do zmiennej imageFIle
   */
  uploadImage(event): void {
    this.imageFile = event.target.files[0];
  }

  /*
  Służy do wpisania ceny dla konkretnej, wybranej usługi
   */
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

  /*
  Sprawdza czy została wybrana jakakolwiek usługa, czy cena została wpisana i czy jest większa od 0
   */
  isServiceFormValid(): boolean {
    if (this.noServiceChecked() || this.isPriceZero() || this.isPriceNegative()) {
      return true;
    }
    return false;
  }

  /*
  Sprawdza czy została wybrana choć jedna usługa
   */
  noServiceChecked(): boolean {
    const currentService = this.selectedServices.find(service => service.isChosen === true);
    if (currentService === undefined) {
      return true;
    } else {
      return false;
    }
  }

  /*
  Sprawdza czy wprowadzono cenę za usługę
   */
  isPriceZero(): boolean {
    const currentService = this.selectedServices.find(service => service.price === 0);
    if (currentService === undefined) {
      return false;
    } else {
      if (currentService.isChosen === true) {
        return true;
      }
      return false;
    }
  }

  /*
  Sprawdza czy wprowadzona cena jest mniejsza od 0
   */
  isPriceNegative(): boolean {
    const currentService = this.selectedServices.find(service => service.price < 0);
    if (currentService === undefined) {
      return false;
    } else {
      if (currentService.isChosen === true) {
        return true;
      }
      return false;
    }
  }

/*  @ViewChildren('serviceCheckboxes') checkboxes: QueryList<ElementRef>;
  @ViewChildren('priceInputs') priceCheckboxes: QueryList<ElementRef>;

  uncheckAllServices(): void {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.priceCheckboxes.forEach((element) => {
      element.nativeElement.value = 0;
    });
  }*/

  onSelectCity(): void {
    console.log(this.selectedCityId);
  }

  /*
  Sprawdza czy miasto zostało wybrane
   */
  isCitySelected(): boolean {
    if (this.selectedCityId === undefined) {
      return true;
    } else {
      return false;
    }
  }

  /*
  Sprawdza czy wybrano specjalizacje
   */
  isSpecializationSelected(): boolean {
    if (this.selectedSpecializationId === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
