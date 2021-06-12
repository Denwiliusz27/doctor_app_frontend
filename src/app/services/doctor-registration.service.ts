import { Injectable } from '@angular/core';
import {DoctorRegistrationModel} from '../doctor-registration/doctor-registration.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegistrationService {

  constructor(private http: HttpClient) { }

  addDoctor(doctor: DoctorRegistrationModel) {
    console.log('wysylam doktora');
    console.log(doctor);
    this.http.post<DoctorRegistrationModel>('http://localhost:8080/lekarz/dodaj', doctor);
    // this.http.get<any>('http://localhost:8080/lekarz/wszyscy').subscribe(odpowiedz => console.log(odpowiedz));
  }

  getDoctorByEmailAddress(email: string){
    return this.http.get<DoctorRegistrationModel>(`http://localhost:8080/lekarz/email/${email}`);
  }

}
