import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DoctorLoginComponent} from './doctor-login/doctor-login.component';
import {PatientLoginComponent} from './patient-login/patient-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {DoctorVisitsComponent} from './doctor-visits/doctor-visits.component';
import {PatientVisitsComponent} from './patient-visits/patient-visits.component';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService
} from '@syncfusion/ej2-angular-schedule';
import {AuthModule} from './auth/auth.module';
import {UserIsNotLoggedGuard} from './auth/guard/user-is-not-logged';
import {DoctorGuard} from './auth/guard/doctor.guard';
import {PatientGuard} from './auth/guard/patient.guard';
import {jqxButtonModule} from 'jqwidgets-ng/jqxbuttons';
import {jqxSchedulerModule} from 'jqwidgets-ng/jqxscheduler';
import { FindDoctorsComponent } from './find-doctors/find-doctors.component';
import { DoctorOverviewSiteComponent } from './doctor-overview-site/doctor-overview-site.component';
import {CustomPipeDate} from './pipes/date.pipe';
import {CustomPipeTime} from './pipes/time.pipe';
import {DatePipe} from '@angular/common';
import { PatientVisitOverviewComponent } from './patient-visit-overview/patient-visit-overview.component';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-login', component: DoctorLoginComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'pacjent-login', component: PatientLoginComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'pacjent-rejestracja', component: PatientRegistrationComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-rejestracja', component: DoctorRegistrationComponent, canActivate: [UserIsNotLoggedGuard]},
  {path: 'doktor-strona-główna', component: DoctorHomepageComponent, canActivate: [DoctorGuard]},
  {path: 'pacjent-strona-główna', component: PatientHomepageComponent, canActivate: [PatientGuard]},
  {path: 'doktor-kalendarz', component: DoctorCalendarComponent, canActivate: [DoctorGuard]},
  {path: 'doktor-wizyty', component: DoctorVisitsComponent, canActivate: [DoctorGuard]},
  {path: 'doktor-pacjenci', component: DoctorPatientsComponent, canActivate: [DoctorGuard]},
  {path: 'pacjent-wizyty', component: PatientVisitsComponent, canActivate: [PatientGuard]},
  {path: 'znajdź-lekarzy', component: FindDoctorsComponent, canActivate: [PatientGuard]},
  {path: 'strona-lekarza', component: DoctorOverviewSiteComponent, canActivate: [PatientGuard]},
  {path: 'wizyta-pacjenta', component: PatientVisitOverviewComponent, canActivate: [PatientGuard]}
];

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
    DoctorVisitsComponent,
    PatientVisitsComponent,
    FindDoctorsComponent,
    DoctorOverviewSiteComponent,
    CustomPipeDate,
    CustomPipeTime,
    PatientVisitOverviewComponent,
    DoctorPatientsComponent
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
    jqxButtonModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    AuthModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    ),
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
