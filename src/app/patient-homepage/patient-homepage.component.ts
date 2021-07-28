import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {SpecializationService} from '../services/specialization.service';
import {CityService} from '../services/city.service';

@Component({
  selector: 'app-patient-homepage',
  templateUrl: './patient-homepage.component.html',
  styleUrls: ['./patient-homepage.component.css']
})
export class PatientHomepageComponent implements OnInit {
  readonly cities$ = this.cityService.cities$; // lista specjalizacji
  selectedSpecializationId: number;
  readonly specializations$ = this.specializationStrategy.specializations$; // lista specjalizacji
  selectedCityId: number;
  options: string[] = ['wizyty', 'wyniki'];

  constructor(private router: Router, private specializationStrategy: SpecializationService, private cityService: CityService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.authService.logout();
  }
}
