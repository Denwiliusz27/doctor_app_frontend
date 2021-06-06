import { Injectable } from '@angular/core';
import {DoctorRegistrationModel} from '../doctor-registration/doctor-registration.component';
import {HttpClient} from '@angular/common/http';

export interface Specialization {
  specializationId: number;
  specializationName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) { }

  getSpecializations(){
    return this.http.get<Specialization[]>('http://localhost:8080/specjalizacje/wszystkie');
  }
}
