import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'doktor-login', component: DoctorLoginComponent},
  { path: 'pacjent-login', component: PatientLoginComponent},
  { path: 'pacjent-rejestracja', component: PatientRegistrationComponent},
  { path: 'doktor-rejestracja', component: DoctorRegistrationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DoctorLoginComponent,
    PatientLoginComponent,
    PatientRegistrationComponent,
    DoctorRegistrationComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
