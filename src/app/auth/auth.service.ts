import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doctor, LoginUser, Patient, User, UserRole} from '../model/user/user';
import {CreateUserRequest} from '../model/user/dto/create-user';
import {UserStrategy} from './strategy/user-strategy';
import {PatientStrategy} from './strategy/patient-strategy';
import {DoctorStrategy} from './strategy/doctor-strategy';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AppStorageService} from '../storage/app-storage.service';
import {Router} from '@angular/router';
import {serverUrl} from '../../environments/environment';
import {Visit, VisitWithDoctor} from '../model/visit/visit';
import {VisitService} from '../services/visit.service';

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

  get doctor(): Doctor {
    return this.appStorageService.doctor;
  }

  get visitId(): number {
    return this.appStorageService.visitId;
  }

  get visit(): number {
    return this.appStorageService.visit;
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

  public setSelectedDoctor(doctor: Doctor): void {
    this.appStorageService.setDoctor(doctor);
  }

  public clearDoctor(): void {
    this.appStorageService.clearDoctor();
  }

  public setSelectedVisitId(visitId: number): void {
    this.appStorageService.setVisitId(visitId);
  }

  public clearVisitId(): void {
    this.appStorageService.clearVisitId();
  }

  public setSelectedVisit(visit: number): void {
    this.appStorageService.setVisit(visit);
  }

  public clearVisit(): void {
    this.appStorageService.clearVisit();
  }

  public logout(): void{
    setTimeout(() => {
      this.appStorageService.clearUser();
      this.router.navigate(['']);
    }, 1000);
  }
}
