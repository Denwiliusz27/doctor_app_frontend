import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Specialization, SpecializationService} from '../services/specialization.service';
import {CitiesService, City} from '../services/cities.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-homepage',
  templateUrl: './patient-homepage.component.html',
  styleUrls: ['./patient-homepage.component.css']
})
export class PatientHomepageComponent implements OnInit {
  cities: Observable<City[]> = this.cityService.getCities(); // lista miast
  selectedSpecializationId: number;
  specializations: Observable<Specialization[]> = this.specializationService.getSpecializations(); // lista specjalizacji
  selectedCityId: number;
  options: string[] = ['wizyty', 'wyniki'];

  constructor(private router: Router, private specializationService: SpecializationService, private cityService: CitiesService) { }

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
    console.log('wylogowuje');
  }
}
