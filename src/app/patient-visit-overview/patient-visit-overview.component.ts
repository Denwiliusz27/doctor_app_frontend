import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FindDoctorsService} from '../services/find-doctors.service';
import {AuthService} from '../auth/auth.service';
import {Visit} from '../model/visit/visit';
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
  selectedVisitId: number;
  visit: Visit;
  doctor: Doctor;
  medicalService;
  price;
  visitDate;
  visitTime;
  visitMap = new Map<string, Visit[]>();



  constructor(private router: Router,  private findDoctorService: FindDoctorsService, private authService: AuthService,
              private visitService: VisitService, private doctorService: DoctorStrategy, private medicalServices: MedicalServices) { }

  ngOnInit(): void {
    /*this.visitService.getVisitById(this.authService.visitId).subscribe( response => {
      this.authService.setSelectedVisit(response);
      console.log('wizyta ze strony wizyty: ', this.authService.visit);
    });*/

    this.visit = this.authService.visit;
    console.log('wizyta zarezerwowana: ', this.visit);

    /*this.doctorService.findDoctorById(this.visit.doctorId).subscribe(res => {
      this.doctor = res;
      console.log(this.doctor);
    });*/

    this.doctor = this.authService.doctor;

    const docServ = this.doctor.doctorServices;
    docServ.forEach(serv => {
      if (serv.medicalService.id === this.visit.medicalServiceId) {
        this.medicalService = serv.medicalService;
        this.price = serv.price;
      }
      console.log(serv.medicalService.id);
    });


   /* this.medicalServices.findByMedicalServiceId(this.visit.medicalServiceId).subscribe(res => {
      this.medicalService = res;
      console.log(this.medicalService);
    });*/

    this.visitDate = this.visit.from.split(' ')[0];
    this.visitTime = this.visit.from.split(' ')[1];

    const vs = this.visitMap.get(this.visitDate) ?? [];
    vs.push(this.visit);
    this.visitMap.set(this.visitDate, vs);

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
