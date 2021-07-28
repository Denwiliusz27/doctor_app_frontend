import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DoctorLoginComponent} from './doctor-login/doctor-login.component';
import {PatientLoginComponent} from './patient-login/patient-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {DialogOverviewExampleComponent, PatientRegistrationComponent} from './patient-registration/patient-registration.component';
import {DoctorRegistrationComponent} from './doctor-registration/doctor-registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {DoctorHomepageComponent} from './doctor-homepage/doctor-homepage.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {PatientHomepageComponent} from './patient-homepage/patient-homepage.component';
import {PatientRegistrationComponent} from './patient-registration/patient-registration.component';
import {DoctorCalendarComponent} from './doctor-calendar/doctor-calendar.component';
import {jqxSchedulerModule} from 'jqwidgets-ng/jqxscheduler';
import {DoctorFindingsComponent} from './doctor-findings/doctor-findings.component';
import {DoctorVisitsComponent} from './doctor-visits/doctor-visits.component';
import {PatientVisitsComponent} from './patient-visits/patient-visits.component';
import {PatientFindingsComponent} from './patient-findings/patient-findings.component';
import {PatientFindDoctorComponent} from './patient-find-doctor/patient-find-doctor.component';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService
} from '@syncfusion/ej2-angular-schedule';
import {UserIsLoggedGuard} from './auth/guard/user-guard.service';
import {AuthModule} from './auth/auth.module';
import {UserIsNotLoggedGuard} from './auth/guard/user-is-not-logged';
import {LOCAL_STORAGE, SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {DoctorGuard} from './auth/guard/doctor.guard';
import {PatientGuard} from './auth/guard/patient.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-login', component: DoctorLoginComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'pacjent-login', component: PatientLoginComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'pacjent-rejestracja', component: PatientRegistrationComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-rejestracja', component: DoctorRegistrationComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-strona-główna', component: DoctorHomepageComponent, canActivate: [DoctorGuard]},
  {path: 'pacjent-strona-główna', component: PatientHomepageComponent, canActivate: [PatientGuard]},
  {path: 'doktor-kalendarz', component: DoctorCalendarComponent, canActivate: [UserIsLoggedGuard]},
  {path: 'doktor-wyniki-badań', component: DoctorFindingsComponent, canActivate: [UserIsLoggedGuard]},
  {path: 'doktor-wizyty', component: DoctorVisitsComponent, canActivate: [UserIsLoggedGuard]},
  {path: 'pacjent-wizyty', component: PatientVisitsComponent, canActivate: [UserIsLoggedGuard]},
  {path: 'pacjent-wyniki-badań', component: PatientFindingsComponent, canActivate: [UserIsLoggedGuard]},
  {path: 'pacjent-znajdź-lekarza', component: PatientFindDoctorComponent, canActivate: [UserIsLoggedGuard]},

];


/*export const MY_AWESOME_SERVICE_STORAGE =
  new InjectionToken<StorageService>('MY_STORE');*/
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DoctorLoginComponent,
    PatientLoginComponent,
    PatientRegistrationComponent,
    DoctorRegistrationComponent,
    DoctorHomepageComponent,
    PatientHomepageComponent,
    DoctorCalendarComponent,
    DoctorFindingsComponent,
    DoctorVisitsComponent,
    PatientVisitsComponent,
    PatientFindingsComponent,
    PatientFindDoctorComponent,
    // DialogOverviewExampleComponent
  ],
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    ScheduleModule,
    RecurrenceEditorModule,
    jqxSchedulerModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    AuthModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
/*
    {provide: MY_AWESOME_SERVICE_STORAGE, useExisting: LOCAL_STORAGE},
*/
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
