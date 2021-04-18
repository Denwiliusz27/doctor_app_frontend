import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'doctor-login', component: DoctorLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DoctorLoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
