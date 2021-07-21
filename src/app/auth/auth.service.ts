import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserRole} from '../model/user/user';
import {CreateUserRequest} from '../model/user/dto/create-user';
import {UserStrategy} from './strategy/user-strategy';
import {PatientStrategy} from './strategy/patient-strategy';

@Injectable()
export class AuthService{
  private _user: User;
  private _userStrategyMap = new Map<UserRole, UserStrategy>(
    [
      [UserRole.PATIENT, this.patientStrategy]
    ]
  );

  get user(): User {
    return this._user;
  }

  constructor(private readonly http: HttpClient,
              private readonly patientStrategy: PatientStrategy) {
  }

  public createUser(userRequest: CreateUserRequest){

  }
}
