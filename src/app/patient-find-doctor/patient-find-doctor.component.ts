import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpecializationService} from '../services/specialization.service';
import {CitiesService} from '../services/cities.service';

@Component({
  selector: 'app-patient-find-doctor',
  templateUrl: './patient-find-doctor.component.html',
  styleUrls: ['./patient-find-doctor.component.css']
})
export class PatientFindDoctorComponent implements OnInit {
  options: string[] = ['lekarze', 'wizyty', 'wyniki'];

  constructor(private router: Router) { }

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
}
