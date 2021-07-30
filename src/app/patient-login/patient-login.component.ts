import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {catchError, delay} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {UserErrorResponse} from '../model/user/dto/user-error-response';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})

export class PatientLoginComponent implements OnInit {
  submitted = false;
  emailNotExist = true;
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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginFormGroup.controls;
  }

  login(): void {
    this.submitted = true;

    if (this.loginFormGroup.valid) {
      this.authService.loginUser(this.loginFormGroup.getRawValue())
        .pipe(catchError(error => {
        this.emailNotExist = false;
        this.passwordCorrect = true;
        switch (error.error) {
          case UserErrorResponse.EMAIL_NOT_EXIST:
            this.emailNotExist = true;
            break;
          case UserErrorResponse.INVALID_PASSWORD:
            this.passwordCorrect = false;
            break;
        }
        return of(null);
      }))
        .subscribe(result => {
          if (result){
            this.router.navigate(['pacjent-strona-główna']);
          }
        });
    }
  }

  redirect(): void {
    this.router.navigateByUrl('/pacjent-rejestracja');
  }

}
