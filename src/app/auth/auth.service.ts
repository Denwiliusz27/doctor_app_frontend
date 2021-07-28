import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser, Patient, User, UserRole} from '../model/user/user';
import {CreateUserRequest} from '../model/user/dto/create-user';
import {UserStrategy} from './strategy/user-strategy';
import {PatientStrategy} from './strategy/patient-strategy';
import {DoctorStrategy} from './strategy/doctor-strategy';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AppStorageService} from '../storage/app-storage.service';
import {Router} from '@angular/router';
import {serverUrl} from '../../environments/environment';

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
              private readonly appStorageService: AppStorageService,
              private readonly router: Router){}


  public createUser(userRequest: CreateUserRequest, role: UserRole): Observable<User>{
    return this._userStrategyMap.get(role)
      .createUser(userRequest)
      .pipe(
        tap(user => this.appStorageService.setUser(user))
      );
  }

  public loginUser(loginUser: LoginUser): Observable<User>{
      return this.http.post<User>(`${serverUrl}/auth/login`, loginUser)
      .pipe(
        tap(user => this.appStorageService.setUser(user))
      );
  }

  public logout(): void{
    this.appStorageService.clearUser();
    this.router.navigate(['']);
  }
}
