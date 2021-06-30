import { Injectable } from '@angular/core';
import {PatientRegistration} from '../patient-registration/patient-registration.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientLoginService {

  constructor(private http: HttpClient) { }

  getPatientByEmailAddress(email: string){
    return this.http.get<PatientRegistration>(`http://localhost:8080/pacjent/email/${email}`);
  }
}
