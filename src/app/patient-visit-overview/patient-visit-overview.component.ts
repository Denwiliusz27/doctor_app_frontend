import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FindDoctorsService} from '../services/find-doctors.service';
import {AuthService} from '../auth/auth.service';
import {Visit, } from '../model/visit/visit';
import {VisitService} from '../services/visit.service';
import {Doctor} from '../model/user/user';
import {DoctorStrategy} from '../auth/strategy/doctor-strategy';
import {MedicalServices} from '../services/medical-services.service';

@Component({
  selector: 'app-patient-visit-overview',
  templateUrl: './patient-visit-overview.component.html',
  styleUrls: ['./patient-visit-overview.component.css']
})
export class PatientVisitOverviewComponent implements OnInit {
  options: string[] = ['wizyty', 'znajdź lekarzy' /*'wyniki'*/];
  visit: Visit;
  serviceName: string;
  doctor: Doctor;
  price;
  visitDate;
  visitTime;
  logoutStatus = false;

  constructor(private router: Router,  private findDoctorService: FindDoctorsService, private authService: AuthService,
              private visitService: VisitService, private doctorService: DoctorStrategy, private medicalServices: MedicalServices) { }

  ngOnInit(): void {
    this.visitService.getVisitDetails(this.authService.visit).subscribe(
      response => {
        this.price = response.service.price;
        this.visitDate = response.from.split('T')[0];
        this.visitTime = response.from.split('T')[1].substring(0, 5);
        this.doctor = response.doctor;
        this.serviceName = response.service.medicalService.name;
      }
    );
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(undefined, undefined);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
  }

  redirectToDoctorSite(): void{
    this.doctorService.findDoctorById(this.doctor.id).subscribe(res => {
      this.authService.setSelectedDoctor(res);
      this.router.navigateByUrl('/strona-lekarza');
    });
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }
}
