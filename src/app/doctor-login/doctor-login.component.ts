import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {DoctorLoginService} from '../services/doctor-login.service';


interface DoctorLogin {
  doctorEmailAddress: string;
  doctorPassword: string;
}

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  submitted = false;
  emailExist = true;
  passwordCorrect = true;

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

  prepareDoctorLoginObject(): DoctorLogin{
    return {
      doctorEmailAddress: this.loginFormGroup.value.email,
      doctorPassword: this.loginFormGroup.value.password
    };
  }

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

  redirect(): void {
    this.router.navigateByUrl('/doktor-rejestracja');
  }
}
