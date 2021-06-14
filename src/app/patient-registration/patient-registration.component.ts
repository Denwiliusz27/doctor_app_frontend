import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientRegistrationService} from '../services/patient-registration.service';
import {Router} from '@angular/router';

export interface PatientRegistration {
  patientName: string;
  patientSurname: string;
  patientPesel: string;
  patientEmailAddress: string;
  patientPassword: string;
}

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
      // Validators.email
      Validators.pattern('^[a-z\\d]+[\\w\\d.-]*@(?:[a-z\\d]+[a-z\\d-]+\\.){1,5}[a-z]{2,6}$')

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

  constructor(private router: Router, private patientRegistrationService: PatientRegistrationService) {}

  ngOnInit(): void {
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.registrationFormGroup.controls;
  }

  register(): void {
    this.submitted = true;
    const patientRegistration: PatientRegistration = this.preparePatientObject();

    if (this.registrationFormGroup.valid){
      console.log('jest git');

      this.checkIfEmailExistsAndAdd(patientRegistration);

      console.log(patientRegistration);

    } else {
      console.log('nie jest git');
      this.checkIfEmailExists(patientRegistration);
    }
  }

  preparePatientObject(): PatientRegistration {
    return {
      patientName: this.registrationFormGroup.value.name,
      patientSurname: this.registrationFormGroup.value.surname,
      patientPesel: this.registrationFormGroup.value.pesel,
      patientEmailAddress: this.registrationFormGroup.value.email,
      patientPassword: this.registrationFormGroup.value.password
    };
  }

  checkIfEmailExistsAndAdd(patientRegistration: PatientRegistration){
    console.log('sprawdzam czy email ' + patientRegistration.patientEmailAddress + ' istnieje');
    if (patientRegistration.patientEmailAddress !== ''){
      this.patientRegistrationService.getPatientByEmailAddress(patientRegistration.patientEmailAddress).subscribe(odpowiedz => {
        if (odpowiedz !== null) {
          this.emailExist = true;
          console.log('TAK');
        }
        else {
          this.emailExist = false;
          this.patientRegistrationService.addPatient(patientRegistration, this.emailExist);
          this.router.navigateByUrl('/pacjent-strona-główna');
          console.log('NIE');
        }
      });
    }
  }

  checkIfEmailExists(patientRegistration: PatientRegistration){
    console.log('sprawdzam czy email ' + patientRegistration.patientEmailAddress + ' istnieje');
    if (patientRegistration.patientEmailAddress !== ''){
      this.patientRegistrationService.getPatientByEmailAddress(patientRegistration.patientEmailAddress).subscribe(odpowiedz => {
        if (odpowiedz !== null) {
          this.emailExist = true;
          console.log('TAK');
        }
        else {
          this.emailExist = false;
          console.log('NIE');
        }
      });
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


