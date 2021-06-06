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
    this.http.post<any>('http://localhost:8080/lekarz/dodaj', doctor).subscribe(odpowiedz => console.log(odpowiedz));
    // this.http.get<any>('http://localhost:8080/lekarz/wszyscy').subscribe(odpowiedz => console.log(odpowiedz));
  }

  getServicesBySpecialization(value: string){
    if (value === 'dentysta') {
      return ['badanie', 'konultacje'];
    } else if (value === 'kardiolog'){
      return ['badanie', 'konsultacje kardiolog', 'testy', 'proby  wysilkowe', 'alergeny'];
    } else {
      return [];
    }
  }
}
