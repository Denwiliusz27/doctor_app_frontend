import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateVisitRequest, Visit} from '../model/visit/visit';
import {AvailabilityDoctor} from '../model/availability-doctor/availability-doctor';
import {serverUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private http: HttpClient) {
  }

  getFreeVisitsByDoctorId(doctorId: number): Observable<Visit[]>{
    return this.http.get<Visit[]>(`${serverUrl}/visits?doctorId=${doctorId}`);
  }

  updateVisit(updateVisitRequest: UpdateVisitRequest): Observable<Visit>{
    return this.http.put<Visit>(`${serverUrl}/visits`, updateVisitRequest);
  }

  getVisitById(visitId: number): Observable<Visit> {
    return this.http.get<Visit>(`${serverUrl}/visits/id?visitId=${visitId}`);
  }

  getByPatientId(patientId: number): Observable<Visit[]>{
    return this.http.get<Visit[]>(`${serverUrl}/visits/patient?patientId=${patientId}`);
  }
}


