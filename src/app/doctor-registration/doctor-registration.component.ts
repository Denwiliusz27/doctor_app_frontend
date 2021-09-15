import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Service, ServiceService} from '../services/service.service';
import {SpecializationService} from '../services/specialization.service';
import {CityService} from '../services/city.service';
import {MedicalServices} from '../services/medical-services.service';
import {CreateDoctorRequest} from '../model/user/dto/create-user';
import {AuthService} from '../auth/auth.service';
import {UserRole} from '../model/user/user';
import {catchError} from 'rxjs/operators';

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
  readonly specializations$ = this.specializationService.specializations$; // lista specjalizacji
  readonly cities$ = this.cityService.cities$; // lista specjalizacji
  medicalServices$ = this.medicalService.medicalServices$; // lista specjalizacji
  selectedSpecializationId: number; // id wybranej specjalizacji przez lekarza
  selectedServices: SelectedServices[] = [];  // lista wybranych usług przez lekarza
  selectedCityId: number; // id wybranego miasta
  imageFile = null;
  emailNotExist = false; // zmienna do sprawdzenia czy konto o wpisanym mailu już istnieje w bd
  accountCreated = false;

  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-ZĄĆŚĘŁŃÓŻŹ][a-z-ąśćęįłńóżź]*')
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-ZĄĆŚĘŁŃÓŻŹ][a-ząćśęįłńóżź]+(\-[A-ZĄĆŚĘŁŃÓŻŹ][a-ząćśęįłńóżź]+)?$')
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
    specializationId: new FormControl('', [
    ]),
    services: new FormControl('', [
    ]),
    cityId: new FormControl('', [
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-ZĄĆŚĘŁŃÓŻŹ][a-ząśćęįłńóżź]+(\-[A-ZĄĆŚĘŁŃÓŻŹ][a-ząćśęįłńóżź]+)? ){1,}' +
        '[0-9]{1,}(\/[0-9]{1,})*[a-zA-Z]{0,1}') // na początek: [u][l][.]
    ]),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{3}')
    ]),
    description: new FormControl()
  });

  constructor(private serviceService: ServiceService, private specializationService: SpecializationService,
              private cityService: CityService, private router: Router, private medicalService: MedicalServices,
              private readonly authService: AuthService) {
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
      const doctorRequest: CreateDoctorRequest = this.registrationFormGroup.getRawValue();
      doctorRequest.medicalServices = this.selectedServices.filter(s => s.isChosen).map(s => ({
        id: s.id, price: s.price
      }));
      this.authService.createUser(doctorRequest, UserRole.DOCTOR)
        .pipe(
          catchError(error => {
            console.log(error);
            this.emailNotExist = true;
            return of(null);
          })
        )
        .subscribe(result => {
          if (result) {
            this.emailNotExist = false;
            this.accountCreated = true;
            setTimeout(() => {
              this.router.navigate(['doktor-strona-główna']);
            }, 2000);
          }
        });
    }
  }

  /*
  Przy zmianie specjalizacji, nadpisuje selectedSpecializationId i wyzerowuje liste wybranych wcześniej usług
   */
  onSelectSpecialization(): void {
    this.selectedServices = [];
    this.medicalServices$ = this.medicalService.findById(this.selectedSpecializationId);
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
      return false;
    } else {
      return true;
    }
  }
}
