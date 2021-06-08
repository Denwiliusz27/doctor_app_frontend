import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Service {
  serviceId: number;
  serviceName: string;
  specializationId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServicesBySpecializationId(specializationId: number){
    return this.http.get<Service[]>(`http://localhost:8080/uslugi/specjalizacja/${specializationId}`);
  }
}
