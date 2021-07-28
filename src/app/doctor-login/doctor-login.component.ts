import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

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
  emailNotExist = false;  // zmienna do sprawdzenia czy podany email istnieje w bd
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

  constructor(private router: Router, private authService: AuthService) {
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

    if (this.loginFormGroup.valid) {
      this.authService.loginUser(this.loginFormGroup.getRawValue())
        .subscribe(() => this.router.navigate(['doktor-strona-główna']),
          () => this.emailNotExist = true);
    }
  }


  /*
  Sprawdza czy dla podanego maila istnieje konto w bd. Jeśli tak, przekierowuje na odpowiednią strone
 */


  /*
  Przekierowuje na stronę główną lekarza
   */
  redirect(): void {
    this.router.navigateByUrl('/doktor-rejestracja');
  }
}
