import {Component, ViewChild} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {observable, ReplaySubject} from "rxjs";
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';
import { loadCldr } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';

declare var require: any;
/*

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/fr-CH/ca-gregorian.json'),
  require('cldr-data/main/fr-CH/numbers.json'),
  require('cldr-data/main/fr-CH/timeZoneNames.json'));
*/

/*
L10n.load({
  'pl': {
    'schedule': {
      'day': 'dzień',
      'week': 'tydzień',
      'workWeek': 'tydzień roboczy',
      'month': 'miesiąc',
      'today': 'dziś',
      'agenda': 'agenda'
    }
  }
});
*/



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
}

