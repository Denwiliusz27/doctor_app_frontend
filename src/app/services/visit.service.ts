import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateVisitRequest, Visit, VisitDetails, VisitType, VisitWithDoctor} from '../model/visit/visit';
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

  getVisitDetails(visitId: number): Observable<any> {
    return this.http.get(`${serverUrl}/visits/details/${visitId}`);
  }

  getVisitDetailsListByDoctorId(doctorId: number, type: VisitType = VisitType.ALL): Observable<VisitDetails[]> {
    return this.http.get<VisitDetails[]>(`${serverUrl}/visits/details-list-by-doctor/${doctorId}?type=${type}`);
  }

  getVisitDetailsListByPatientId(patientId: number, type: VisitType = VisitType.ALL): Observable<VisitDetails[]> {
    return this.http.get<VisitDetails[]>(`${serverUrl}/visits/details-list-by-patient/${patientId}?type=${type}`);
  }
}


