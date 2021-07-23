import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {PatientStrategy} from './strategy/patient-strategy';
import {DoctorStrategy} from './strategy/doctor-strategy';
import {UserIsLoggedGuard} from './guard/user-guard.service';
import {UserIsNotLoggedGuard} from './guard/user-is-not-logged';

@NgModule({
  providers: [AuthService, PatientStrategy, DoctorStrategy, UserIsLoggedGuard, UserIsNotLoggedGuard]
})
export class AuthModule{
}
