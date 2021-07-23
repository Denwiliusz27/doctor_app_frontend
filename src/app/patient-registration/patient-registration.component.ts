import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserRole} from '../model/user/user';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  submitted = false;
  emailExist = false;

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
       .subscribe(
         () => this.router.navigate(['pacjent-strona-główna']),
         () => this.emailExist = true
       );
    }
  }


}
/*
  openDialog(): void{
    const dialogRef = this.dialog.open(DialogOverviewExampleComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.disableForms = false;
    });
  }*/


/*

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
*/


