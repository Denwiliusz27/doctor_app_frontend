import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {PatientStrategy} from './strategy/patient-strategy';
import {DoctorStrategy} from './strategy/doctor-strategy';
import {UserIsLoggedGuard} from './guard/user-guard.service';
import {UserIsNotLoggedGuard} from './guard/user-is-not-logged';
import {DoctorGuard} from './guard/doctor.guard';
import {PatientGuard} from './guard/patient.guard';

@NgModule({
  providers: [AuthService, PatientStrategy, DoctorStrategy, UserIsLoggedGuard, UserIsNotLoggedGuard, DoctorGuard, PatientGuard]
})
export class AuthModule{
}
