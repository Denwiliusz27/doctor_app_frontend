import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {SpecializationService} from '../services/specialization.service';
import {CityService} from '../services/city.service';
import {DoctorStrategy} from '../auth/strategy/doctor-strategy';
import {Doctor} from '../model/user/user';
import {FindDoctorsService} from '../services/find-doctors.service';

@Component({
  selector: 'app-patient-homepage',
  templateUrl: './patient-homepage.component.html',
  styleUrls: ['./patient-homepage.component.css']
})
export class PatientHomepageComponent implements OnInit {
  readonly cities$ = this.cityService.cities$; // lista miast
  selectedSpecializationId: number;
  readonly specializations$ = this.specializationStrategy.specializations$; // lista specjalizacji
  selectedCityId: number;
  options: string[] = ['wizyty', 'znajdź lekarzy'/*, 'wyniki'*/];
  doctors: Doctor[] = [];
  user = this.authService.user;
  logoutStatus = false;

  constructor(private router: Router, private specializationStrategy: SpecializationService, private cityService: CityService,
              private authService: AuthService, private doctorStrategy: DoctorStrategy, private findDoctorService: FindDoctorsService) { }

  ngOnInit(): void {
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    } else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(this.selectedCityId, this.selectedSpecializationId);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }

  findDoctors() {
    this.findDoctorService.searchDoctors(this.selectedCityId, this.selectedSpecializationId);
    this.router.navigate(['znajdź-lekarzy']);
  }
}
