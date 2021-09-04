import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-doctor-visits',
  templateUrl: './doctor-visits.component.html',
  styleUrls: ['./doctor-visits.component.css']
})
export class DoctorVisitsComponent implements OnInit {
  menuOptions: string[] = ['kalendarz', 'wizyty', 'pacjenci'];
  logoutStatus = false;

  constructor(private router: Router, private authService: AuthService) { }

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
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }
}
