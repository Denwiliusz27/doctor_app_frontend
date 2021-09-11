import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {VisitService} from '../services/visit.service';
import {VisitType} from '../model/visit/visit';

@Component({
  selector: 'app-doctor-visits',
  templateUrl: './doctor-visits.component.html',
  styleUrls: ['./doctor-visits.component.css']
})
export class DoctorVisitsComponent implements OnInit {
  menuOptions: string[] = ['kalendarz', 'wizyty', 'pacjenci'];
  logoutStatus = false;
  visits;
  type = VisitType;

  constructor(private router: Router, private authService: AuthService, private visitService: VisitService) { }

  ngOnInit(): void {
    this.visitService.getVisitDetailsListByDoctorId(this.authService.user.id).subscribe(res => {
      console.log('wizyty: ', res);
      this.visits = res;
    });
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

  fetchVisits(type: VisitType) {
    this.visitService.getVisitDetailsListByDoctorId(this.authService.user.id, type).subscribe(res => {
      this.visits = res;
    });
  }
}
