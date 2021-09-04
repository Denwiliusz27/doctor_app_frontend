import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FindDoctorsService} from '../services/find-doctors.service';
import {AuthService} from '../auth/auth.service';
import {Visit, VisitWithDoctor} from '../model/visit/visit';
import {VisitService} from '../services/visit.service';
import {Doctor} from '../model/user/user';
import {DoctorServiceService} from '../services/doctor-service.service';
import {DoctorStrategy} from '../auth/strategy/doctor-strategy';
import {MedicalService} from '../model/medical-service/medical-service';
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

  constructor(private router: Router,  private findDoctorService: FindDoctorsService, private authService: AuthService,
              private visitService: VisitService, private doctorService: DoctorStrategy, private medicalServices: MedicalServices) { }

  ngOnInit(): void {
    this.visitService.getVisitDetails(this.authService.visit.id).subscribe(
      response => {
        this.price = response.service.price;
        this.visitDate = response.from.split('T')[0];
        this.doctor = response.doctor;
        this.serviceName = response.service.medicalService.name;
      }
    );
  }

  /*setVisit(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.visitService.getVisitWithDoctorById(this.visit.id).subscribe(res => {
          this.newVisit = res;
          // console.log('nowa wizyta: ', res);
        });
      }, 1000);
    });
  }*/

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    } else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(undefined, undefined);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
    console.log('przekierowuje do ' + option);
  }

  redirectToDoctorSite(): void{
    this.authService.setSelectedDoctor(this.doctor);
    this.router.navigateByUrl('/strona-lekarza');
  }

  logout() {
    this.authService.logout();
  }
}
