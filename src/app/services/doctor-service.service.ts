import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface DoctorService{
  doctorId: number;
  serviceId: number;
  servicePrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  constructor(private http: HttpClient) { }

  addDoctorServices(doctorServices: DoctorService[]){
    return this.http.post('http://localhost:8080/uslugi-lekarzy/dodaj', doctorServices).subscribe(odp => console.log(odp));
  }
}
