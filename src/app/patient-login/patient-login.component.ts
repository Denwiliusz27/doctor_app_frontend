import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {PatientLoginService} from '../services/patient-login.service';

interface PatientLogin {
  patientEmailAddress: string;
  patientPassword: string;
}


@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})

export class PatientLoginComponent implements OnInit {
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

  constructor(private router: Router, private patientLoginService: PatientLoginService) {}

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginFormGroup.controls;
  }

  login(): void {
    this.submitted = true;

    const patientLogin: PatientLogin = this.preparePatientLoginObject();
    if (this.loginFormGroup.valid) {
      console.log('validacja ok');
      this.checkIfEmailExistsAndNavigate(patientLogin);

    } else {
      this.checkIfEmailExists(patientLogin);
    }
  }

  preparePatientLoginObject(): PatientLogin{
    return {
      patientEmailAddress: this.loginFormGroup.value.email,
      patientPassword: this.loginFormGroup.value.password
    };
  }

  checkIfEmailExistsAndNavigate(patientLogin: PatientLogin) {
    console.log('sprawdzam czy email ' + patientLogin.patientEmailAddress + ' istnieje');
    if (patientLogin.patientEmailAddress !== ''){
      this.patientLoginService.getPatientByEmailAddress(patientLogin.patientEmailAddress).subscribe(odpowiedz => {
        if (odpowiedz != null) {
          console.log('taki email istnieje');
          this.emailExist = true;
          if (odpowiedz.patientPassword === patientLogin.patientPassword){
            this.passwordCorrect = true;
            console.log('haslo ' + patientLogin.patientPassword + ' poprawne');
            // this.router.navigateByUrl('/pacjent-strona-główna');
          } else {
            this.passwordCorrect = false;
            console.log('haslo ' + patientLogin.patientPassword + ' niepoprawne');
          }
        } else {
          this.emailExist = false;
          console.log('email nie istnieje');
        }
      });
    }
  }

  checkIfEmailExists(patientLogin: PatientLogin) {
    console.log('sprawdzam czy email ' + patientLogin.patientEmailAddress + ' istnieje');
    if (patientLogin.patientEmailAddress !== ''){
      this.patientLoginService.getPatientByEmailAddress(patientLogin.patientEmailAddress).subscribe(odpowiedz => {
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
    this.router.navigateByUrl('/pacjent-rejestracja');
  }

}
