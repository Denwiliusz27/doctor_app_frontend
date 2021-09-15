import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserErrorResponse} from '../model/user/dto/user-error-response';
import {UserRole} from '../model/user/user';

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
  loginAccepted = false;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
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

  login(): void {
    this.submitted = true;

    if (this.loginFormGroup.valid) {
      this.authService.loginUser({
        ...this.loginFormGroup.getRawValue(),
        role: UserRole.DOCTOR
      })
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
        .subscribe(response => {
          if (response){
            this.passwordCorrect = true;
            this.emailNotExist = false;
            this.loginAccepted = true;
            setTimeout(() => {
              this.router.navigate(['doktor-strona-główna']);
            }, 2000);
          }
        });
    }
  }

  redirect(): void {
    this.router.navigateByUrl('/doktor-rejestracja');
  }
}
