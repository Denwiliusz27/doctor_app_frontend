import { Injectable } from '@angular/core';
import {DoctorRegistrationModel} from '../doctor-registration/doctor-registration.component';
import {HttpClient} from '@angular/common/http';

export interface City {
  cityId: number;
  cityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities(){
    return this.http.get<City[]>('http://localhost:8080/miasta/wszystkie');
  }
}
