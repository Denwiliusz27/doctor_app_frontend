import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { DoctorHomepageComponent } from './doctor-homepage/doctor-homepage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'doktor-login', component: DoctorLoginComponent},
  { path: 'pacjent-login', component: PatientLoginComponent},
  { path: 'pacjent-rejestracja', component: PatientRegistrationComponent},
  { path: 'doktor-rejestracja', component: DoctorRegistrationComponent},
  { path: 'doktor-strona-główna', component: DoctorHomepageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DoctorLoginComponent,
    PatientLoginComponent,
    PatientRegistrationComponent,
    DoctorRegistrationComponent,
    DoctorHomepageComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
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
