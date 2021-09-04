import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateAvailabilityDoctorRequest} from '../model/availability-doctor/dto/create-availability-doctor.request';
import {Observable} from 'rxjs';
import {AvailabilityDoctor} from '../model/availability-doctor/availability-doctor';
import {serverUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityDoctorService {

  constructor(private readonly http: HttpClient) {}

  add(request: CreateAvailabilityDoctorRequest): Observable<AvailabilityDoctor> {
    return this.http.post<AvailabilityDoctor>(`${serverUrl}/availabilities-doctor`, request);
  }

  getAllByDoctorId(doctorId: number): Observable<AvailabilityDoctor[]> {
    return this.http.get<AvailabilityDoctor[]>(`${serverUrl}/availabilities-doctor?doctorId=${doctorId}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<AvailabilityDoctor[]>(`${serverUrl}/availabilities-doctor/${id}`);
  }
}

