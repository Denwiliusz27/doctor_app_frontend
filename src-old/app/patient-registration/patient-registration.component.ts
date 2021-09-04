import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserRole} from '../model/user/user';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  submitted = false;
  emailExist = false;
  accountCreated = false;

  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Z][a-z-ąćśęįłńóżź]*')
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-ZĄĆŚĘŁŃÓŻŹ][a-ząćśęįłńóżź]+(\-[A-ZĄĆŚĘŁŃÓŻŹ][a-ząćśęįłńóżź]+)?$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    pesel: new FormControl('', [
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^.*[0-9]')
    ]),
  });

  constructor(private router: Router, private readonly authService: AuthService) {}

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.registrationFormGroup.controls;
  }

  register(): void {
    this.submitted = true;

    if (this.registrationFormGroup.valid){
     this.authService.createUser(this.registrationFormGroup.getRawValue(), UserRole.PATIENT)
       .pipe(
         catchError(error => {
           console.log(error);
           this.emailExist = true;
           return of(null);
         })
       )
       .subscribe( result => {
         if (result) {
           this.accountCreated = true;
           this.emailExist = false;
           setTimeout(() => {
             this.router.navigate(['pacjent-strona-główna']);
           }, 2000);
         }
       });
    }
  }
}


