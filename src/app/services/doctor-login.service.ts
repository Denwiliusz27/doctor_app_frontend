import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DoctorRegistrationModel} from '../doctor-registration/doctor-registration.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorLoginService {

  constructor(private http: HttpClient) { }

  getDoctorByEmailAddress(email: string) {
    return this.http.get<DoctorRegistrationModel>(`http://localhost:8080/lekarz/email/${email}`);
  }

  getDoctorBy
}
