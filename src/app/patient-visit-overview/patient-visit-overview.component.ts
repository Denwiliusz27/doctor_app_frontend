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
  newVisit: VisitWithDoctor;
  doctor: Doctor;
  medicalService;
  price;
  visitDate;
  visitTime;
  visitMap = new Map<string, VisitWithDoctor[]>();

  constructor(private router: Router,  private findDoctorService: FindDoctorsService, private authService: AuthService,
              private visitService: VisitService, private doctorService: DoctorStrategy, private medicalServices: MedicalServices) { }

  ngOnInit(): void {
    this.newVisit = this.authService.visit;
    console.log('wizyta zarezerwowana: ', this.visit);

    /*this.visitService.getVisitWithDoctorById(this.visit.id).subscribe(res => {
      this.newVisit = res;
      console.log('nowa wizyta: ', res);
    });*/

    /*(async () => {
      await this.setVisit();
    })();*/

    console.log('jestem tu');

    this.doctor = this.authService.doctor;

    // const docServ = this.doctor.doctorServices;
    const docServ = this.newVisit.doctor.doctorServices;
    docServ.forEach(serv => {
      if (serv.id === this.newVisit.medicalService.id) {
        this.medicalService = serv.medicalService;
        this.price = serv.price;
      }
      console.log(serv.id);
    });

    this.visitDate = this.newVisit.from.split(' ')[0];
    this.visitTime = this.newVisit.from.split(' ')[1];

    const vs = this.visitMap.get(this.visitDate) ?? [];
    vs.push(this.newVisit);
    this.visitMap.set(this.visitDate, vs);

  }

  setVisit(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.visitService.getVisitWithDoctorById(this.visit.id).subscribe(res => {
          this.newVisit = res;
          console.log('nowa wizyta: ', res);
        });
      }, 1000);
    });
  }

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
