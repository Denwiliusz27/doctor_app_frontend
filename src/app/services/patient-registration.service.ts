import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DoctorRegistrationModel} from '../doctor-registration/doctor-registration.component';
import {PatientRegistration, PatientRegistrationComponent} from '../patient-registration/patient-registration.component';

@Injectable({
  providedIn: 'root'
})

export class PatientRegistrationService {

  constructor(private http: HttpClient) { }

  getPatientByEmailAddress(email: string){
    return this.http.get<PatientRegistration>(`http://localhost:8080/pacjent/email/${email}`);
  }

  addPatient(patientRegistration: PatientRegistration, emailExist: boolean) {
    console.log('dodaje pacjenta pacjenta');
    this.http.post('http://localhost:8080/pacjent/dodaj', patientRegistration).subscribe(odpowiedz => {
      console.log(odpowiedz);
      if (odpowiedz === null) {
        emailExist = true;
      }
    });
  }
}
