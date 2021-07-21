import {UserStrategy} from './user-strategy';
import {Patient} from '../../model/user/user';
import {CreateUserRequest} from '../../model/user/dto/create-user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {serverUrl} from '../../../environments/environment';

@Injectable()
export class PatientStrategy implements UserStrategy<Patient>{
  constructor(private readonly http: HttpClient) {
  }

  createUser(request: CreateUserRequest): Observable<Patient> {
    return this.http.post<Patient>(serverUrl, request);
  }

}
