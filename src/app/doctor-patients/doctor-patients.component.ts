import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorService} from '../services/doctor.service';
import {Doctor} from '../model/user/user';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.scss']
})
export class DoctorPatientsComponent implements OnInit {
  menuOptions: string[] = ['kalendarz', 'wizyty', 'pacjenci'];
  logoutStatus = false;

  patients$ = this.doctorService.getPatients((this.authService.user as Doctor).id);

  constructor(private router: Router,
              private readonly doctorService: DoctorService,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  redirect(option: string): void {
    if (option === 'kalendarz') {
      this.router.navigateByUrl('/doktor-kalendarz');
    }
    else if (option === 'wizyty') {
      this.router.navigateByUrl('/doktor-wizyty');
    }
    else if (option === 'pacjenci') {
      this.router.navigateByUrl('/doktor-pacjenci');
    }
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }
}
