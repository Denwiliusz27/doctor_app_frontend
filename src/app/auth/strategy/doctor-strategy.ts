import {Injectable} from '@angular/core';
import {Doctor, LoginUser, Patient} from '../../model/user/user';
import {UserStrategy} from './user-strategy';
import {CreateUserRequest} from '../../model/user/dto/create-user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {serverUrl} from '../../../environments/environment';

@Injectable()
export class DoctorStrategy implements UserStrategy<Doctor> {

  constructor(private readonly http: HttpClient) {
  }

  createUser(request: CreateUserRequest): Observable<Doctor> {
    return this.http.post<Doctor>(`${serverUrl}/auth/create/doctor`, request);
  }

  findDoctorsByCityIdAndSpecializationId(cityId: number, specializationId: number): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${serverUrl}/doctors?cityId=${cityId}&specializationId=${specializationId}`);
  }

  findDoctorsByCityId(cityId: number): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${serverUrl}/doctors/city?cityId=${cityId}`);
  }

  findDoctorsBySpecializationId(specializationId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${serverUrl}/doctors/specialization?specializationId=${specializationId}`);
  }

  findAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${serverUrl}/doctors/all`);

  }
}
