import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-visits',
  templateUrl: './doctor-visits.component.html',
  styleUrls: ['./doctor-visits.component.css']
})
export class DoctorVisitsComponent implements OnInit {
  menuOptions: string[] = ['kalendarz', 'wizyty'/*, 'wyniki'*/];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(option: string): void {
    if (option === 'kalendarz') {
      this.router.navigateByUrl('/doktor-kalendarz');
    }
    else if (option === 'wizyty') {
      this.router.navigateByUrl('/doktor-wizyty');
    }
    else if (option === 'wyniki') {
      this.router.navigateByUrl('/doktor-wyniki-badań');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    console.log('wylogowuję');
  }
}
