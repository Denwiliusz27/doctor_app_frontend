import {Component, OnInit, ViewChild} from '@angular/core';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';
import {Router} from '@angular/router';
import {EventSettingsModel, View} from '@syncfusion/ej2-angular-schedule';
import { loadCldr, L10n, setCulture, setCurrencyCode} from '@syncfusion/ej2-base';
/*
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr-CH/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr-CH/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr-CH/timeZoneNames.json';
*/

@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {
  menuOptions: string[] = ['kalendarz', 'wizyty', 'wyniki'];
  setView: View = 'Week';
  scheduleViews: View[] = ['Week', 'WorkWeek'];
  workWeekDays: number[] = [1, 2, 3, 4, 5, 6];



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
