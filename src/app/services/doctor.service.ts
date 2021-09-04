import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor, Patient} from '../model/user/user';
import {serverUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private readonly http: HttpClient) {}

  getPatients(doctorId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${serverUrl}/doctors/${doctorId}/patients`);
  }

  getDoctorByUserId(userId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${serverUrl}/doctors/${userId}/doctor`);
  }
}
