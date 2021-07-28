import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpecializationService} from '../services/specialization.service';
import {CityService} from '../services/city.service';

@Component({
  selector: 'app-patient-findings',
  templateUrl: './patient-findings.component.html',
  styleUrls: ['./patient-findings.component.css']
})
export class PatientFindingsComponent implements OnInit {
  options: string[] = ['lekarze', 'wizyty', 'wyniki'];

  constructor(private router: Router, private specializationStrategy: SpecializationService, private cityService: CityService) { }

  ngOnInit(): void {
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    } else if (option === 'lekarze') {
      this.router.navigateByUrl('/pacjent-znajdź-lekarza');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    console.log('wylogowuje');
  }
}
