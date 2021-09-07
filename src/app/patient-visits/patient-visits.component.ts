import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FindDoctorsService} from '../services/find-doctors.service';
import {Visit, VisitWithDoctor} from '../model/visit/visit';
import {VisitService} from '../services/visit.service';
import {AuthService} from '../auth/auth.service';
import {Doctor} from '../model/user/user';
import {DoctorStrategy} from '../auth/strategy/doctor-strategy';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})
export class PatientVisitsComponent implements OnInit {
  options: string[] = ['wizyty', 'znajdź lekarzy'];
  visits;
  logoutStatus = false;

  constructor(private router: Router, private findDoctorService: FindDoctorsService, private authService: AuthService,
              private visitService: VisitService, private doctorService: DoctorStrategy) { }

  ngOnInit(): void {
    this.visitService.getVisitDetailsListByPatientId(this.authService.user.id).subscribe(res => {
      this.visits = res;
    });
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    }  else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(undefined, undefined);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
    console.log('przekierowuje do ' + option);
  }

  displayVisitSite(visit): void {
    setTimeout(() => {
      this.authService.setSelectedVisit(visit.id);
      this.router.navigateByUrl('/wizyta-pacjenta');
    }, 500);
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }
}
