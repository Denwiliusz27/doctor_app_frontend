import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})
export class PatientVisitsComponent implements OnInit {
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

  logout() {
    console.log('wylogowuje');
  }
}
