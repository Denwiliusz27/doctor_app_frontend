import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {DoctorLoginService} from '../services/doctor-login.service';

/*
Obiekt doktora posiadający email i hasło, które przekazywane są do bd
 */
interface DoctorLogin {
  doctorEmailAddress: string;
  doctorPassword: string;
}

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})

/*
Komponent służący do logowania doktora na konto
 */
export class DoctorLoginComponent implements OnInit {
  submitted = false;
  emailExist = true;  // zmienna do sprawdzenia czy podany email istnieje w bd
  passwordCorrect = true;  // zmienna do sprawdzenia czy dla podanego maila, wpisane hasło się zgadza

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor(private router: Router, private doctorLoginService: DoctorLoginService) {
  }

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginFormGroup.controls;
  }

  /*
  Służy do zalogowania lekarza na konto:

  Przygotowuje obiekt lekarza, a następnie sprawdza czy istnieje doktor o takim mailu oraz czy hasło się zgadza
   */
  login(): void {
    this.submitted = true;

    const doctorLogin: DoctorLogin = this.prepareDoctorLoginObject();
    if (this.loginFormGroup.valid) {
      console.log('validacja poprawna');
      this.checkIfEmailExistsAndNavigate(doctorLogin);

    } else {
      console.log('validacja nie ok');
      this.checkIfEmailExists(doctorLogin);
    }
  }

  /*
  Tworzy obiekt doktora potrzebny do logowania
   */
  prepareDoctorLoginObject(): DoctorLogin{
    return {
      doctorEmailAddress: this.loginFormGroup.value.email,
      doctorPassword: this.loginFormGroup.value.password
    };
  }

  /*
  Sprawdza czy dla podanego maila istnieje konto w bd. Jeśli tak, przekierowuje na odpowiednią strone
 */
  checkIfEmailExistsAndNavigate(doctorLogin: DoctorLogin) {
    console.log('sprawdzam czy email ' + doctorLogin.doctorEmailAddress + ' istnieje');
    if (doctorLogin.doctorEmailAddress !== ''){
      this.doctorLoginService.getDoctorByEmailAddress(doctorLogin.doctorEmailAddress).subscribe(odpowiedz => {
        if (odpowiedz != null) {
          console.log('taki email istnieje');
          this.emailExist = true;
          if (odpowiedz.doctorPassword === doctorLogin.doctorPassword){
            this.passwordCorrect = true;
            console.log('haslo ' + doctorLogin.doctorPassword + ' poprawne');
            this.router.navigateByUrl('/doktor-strona-główna');
          } else {
            this.passwordCorrect = false;
            console.log('haslo ' + doctorLogin.doctorPassword + ' niepoprawne');
          }
        } else {
          this.emailExist = false;
          console.log('email nie istnieje');
        }
      });
    }
  }

  /*
  Sprawdza czy dla podanego maila istnieje konto w bd. Zmienna emailExist zostaje ustawiona na odpowiedni boolean
   */
  checkIfEmailExists(doctorLogin: DoctorLogin) {
    console.log('sprawdzam czy email ' + doctorLogin.doctorEmailAddress + ' istnieje');
    if (doctorLogin.doctorEmailAddress !== ''){
      this.doctorLoginService.getDoctorByEmailAddress(doctorLogin.doctorEmailAddress).subscribe(odpowiedz => {
        if (odpowiedz != null) {
          console.log('taki email istnieje');
          this.emailExist = true;
        } else {
          this.emailExist = false;
          console.log('email nie istnieje');
        }
      });
    }
  }

  /*
  Przekierowuje na stronę główną lekarza
   */
  redirect(): void {
    this.router.navigateByUrl('/doktor-rejestracja');
  }
}
