import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserRole} from '../model/user/user';
import {CreateUserRequest} from '../model/user/dto/create-user';
import {UserStrategy} from './strategy/user-strategy';
import {PatientStrategy} from './strategy/patient-strategy';
import {DoctorStrategy} from './strategy/doctor-strategy';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
/*
import {MY_AWESOME_SERVICE_STORAGE} from '../app.module';
*/
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {AppStorageService} from '../storage/app-storage.service';

@Injectable()
export class AuthService{
  private _userStrategyMap = new Map<UserRole, UserStrategy>(
    [
      [UserRole.PATIENT, this.patientStrategy],
      [UserRole.DOCTOR, this.doctorStrategy]
    ]
  );

  get user(): User {
    return this.appStorageService.user;
  }

  constructor(private readonly http: HttpClient,
              private readonly patientStrategy: PatientStrategy,
              private readonly doctorStrategy: DoctorStrategy,
              private readonly appStorageService: AppStorageService){}


  public createUser(userRequest: CreateUserRequest, role: UserRole): Observable<User>{
    return this._userStrategyMap.get(role)
      .createUser(userRequest)
      .pipe(
        tap(user => this.appStorageService.setUser(user))
      );
  }

  public logout(): void{
    this.appStorageService.clearUser();
  }
}
