import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class DoctorCalendarComponent implements OnInit, AfterViewInit {
  menuOptions: {name: string, url: string}[] = [{name: 'kalendarz', url: '/doktor-kalendarz' },
    {name: 'wizyty', url: '/doktor-wizyty'},
    {name: 'wyniki', url: '/doktor-wyniki-badań'}];
  setView: View = 'Week';
  scheduleViews: View[] = ['Week', 'WorkWeek'];
  workWeekDays: number[] = [1, 2, 3, 4, 5, 6];
  printButton: any = null;
  date: any = new jqx.date();
  source: any =
    {
      dataType: "array",
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: []
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);

  resources: any =
    {
      colorScheme: "scheme05",
      dataField: "calendar",
      source: new jqx.dataAdapter(this.source)
    };

  views: any[] =
    [
      {
        type: 'weekView',
        showWeekends: false,
        timeRuler: {
          scale: 'half-hour', formatString: 'HH:mm',
          scaleStartHour: 8, scaleEndHour: 16,
          hidden: false
        }
      }
    ];

  appointmentDataFields: any =
    {
      from: "start",
      to: "end",
      id: "id",
      description: "description",
      location: "location",
      subject: "subject",
      resourceId: "calendar"
    };

  localization = {
    // separator of parts of a date (e.g. '/' in 11/05/1955)
    '/': '/',
    // separator of parts of a time (e.g. ':' in 05:44 PM)
    ':': ':',
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 1,
    days: {
      // full day names
      names: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
      // abbreviated day names
      namesAbbr: ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'],
      // shortest day names
      namesShort: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S']
    },
    months: {
      // full month names (13 months for lunar calendards -- 13th month should be '' if not lunar)
      names: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipic', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień', ''],
      // abbreviated month names
      namesAbbr: ['St', 'Lut', 'Mrz', 'Kw', 'Maj', 'Cz', 'Lip', 'Sier', 'Wrz', 'Paź', 'lis', 'Gr', '']
    },
    // AM and PM designators in one of these forms:
    // The usual view, and the upper and lower case versions
    //      [standard,lowercase,uppercase]
    // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
    //      null
    /*AM: ['AM', 'am', 'AM'],
    PM: ['PM', 'pm', 'PM'],*/
    eras: [
      // eras in reverse chronological order.
      // name: the name of the era in this culture (e.g. A.D., C.E.)
      // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
      // offset: offset in years from gregorian calendar
      { 'name': 'A.D.', 'start': null, 'offset': 0 }
    ],
    twoDigitYearMax: 2029,
    patterns: {
      // short date pattern
      d: 'M/d/yyyy',
      // long date pattern
      D: 'dddd, MMMM dd, yyyy',
      // short time pattern
      t: 'h:mm tt',
      // long time pattern
      T: 'h:mm:ss tt',
      // long date, short time pattern
      f: 'dddd, MMMM dd, yyyy h:mm tt',
      // long date, long time pattern
      F: 'dddd, MMMM dd, yyyy h:mm:ss tt',
      // month/day pattern
      M: 'MMMM dd',
      // month/year pattern
      Y: 'yyyy MMMM',
      // S is a sortable format that does not lety by culture
      S: 'yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss',
      // formatting of dates in MySQL DataBases
      ISO: 'yyyy-MM-dd hh:mm:ss',
      ISO2: 'yyyy-MM-dd HH:mm:ss',
      d1: 'dd.MM.yyyy',
      d2: 'dd-MM-yyyy',
      d3: 'dd-MMMM-yyyy',
      d4: 'dd-MM-yy',
      d5: 'H:mm',
      d6: 'HH:mm',
      d7: 'HH:mm tt',
      d8: 'dd/MMMM/yyyy',
      d9: 'MMMM-dd',
      d10: 'MM-dd',
      d11: 'MM-dd-yyyy'
    },
    backString: 'Wcześniejszy',
    forwardString: 'Następny',
    toolBarPreviousButtonString: 'Wcześniejszy',
    toolBarNextButtonString: 'Następny',
    emptyDataString: 'Brak daty',
    loadString: 'Ładowanie...',
    clearString: 'wyczyść',
    todayString: 'dziś',
    // timelineWeekViewString: 'Zeitleiste Woche',
    loadingErrorMessage: 'ERROR',
    /* editRecurringAppointmentDialogTitleString: 'Bearbeiten Sie wiederkehrenden Termin',
    editRecurringAppointmentDialogContentString: 'Wollen Sie nur dieses eine Vorkommen oder die Serie zu bearbeiten ?',
    editRecurringAppointmentDialogOccurrenceString: 'Vorkommen bearbeiten',
    editRecurringAppointmentDialogSeriesString: 'Bearbeiten Die Serie',*/
    editDialogTitleString: 'Usuwanie godzin dyspozycyjności',
    editDialogCreateTitleString: 'Tworzenie nowych godzin dyspozycyjności',
    contextMenuEditAppointmentString: 'Usuń dyspozycyjność',
    contextMenuCreateAppointmentString: 'Ustaw dyspozycyjność',
    /*editDialogSubjectString: 'Subjekt',
    editDialogLocationString: 'Ort',
    editDialogFromString: 'Von',
    editDialogToString: 'Bis',
    editDialogAllDayString: 'Den ganzen Tag',
    editDialogExceptionsString: 'Ausnahmen',
    editDialogResetExceptionsString: 'Zurücksetzen auf Speichern',
    editDialogDescriptionString: 'Bezeichnung',
    editDialogResourceIdString: 'Kalender',
    editDialogStatusString: 'Status',
    editDialogColorString: 'Farbe',
    editDialogColorPlaceHolderString: 'Farbe wählen',
    editDialogTimeZoneString: 'Zeitzone',
    editDialogSelectTimeZoneString: 'Wählen Sie Zeitzone',*/
    editDialogSaveString: 'Ustaw',
    editDialogDeleteString: 'Usuń',
    editDialogCancelString: 'Anuluj',
    editDialogRepeatString: 'Powtórz',
    editDialogRepeatEveryString: 'Dzisiaj',
    /*editDialogRepeatEveryWeekString: 'Tydzień(n)',
    editDialogRepeatEveryYearString: 'Jahr (en)',*/
    editDialogRepeatEveryDayString: 'Dzień (e)',
    editDialogRepeatNeverString: 'Nie',
    editDialogRepeatDailyString: 'Codziennie',
    editDialogRepeatWeeklyString: 'Cotygodniowo',
    editDialogRepeatMonthlyString: 'Comiesięcznie',
    editDialogRepeatYearlyString: 'Corocznie',
    editDialogRepeatEveryMonthString: 'Miesiąc (n)',
    editDialogRepeatEveryMonthDayString: 'Dzień',
    editDialogRepeatFirstString: 'pierwszy',
    editDialogRepeatSecondString: 'drugi',
    editDialogRepeatThirdString: 'trzeci',
    editDialogRepeatFourthString: 'czwarty',
    editDialogRepeatLastString: 'ostatni',
    editDialogRepeatEndString: 'koniec',
    /*editDialogRepeatAfterString: 'Do',
    editDialogRepeatOnString: 'Am',
    editDialogRepeatOfString: 'von',
    editDialogRepeatOccurrencesString: 'Eintritt (e)',
    editDialogRepeatSaveString: 'Vorkommen Speichern',
    editDialogRepeatSaveSeriesString: 'Save Series',
    editDialogRepeatDeleteString: 'Vorkommen löschen',
    editDialogRepeatDeleteSeriesString: 'Series löschen',*/
    editDialogStatuses:
      {
        free: 'Wolny',
        tentative: 'wstępnie',
        busy: 'zatrudniony',
        outOfOffice: 'poza gabinetem'
      }
  };

  editDialogCreate = (dialog, fields, editAppointment) => {
    // hide repeat option
    fields.repeatContainer.hide();
    // hide status option
    fields.statusContainer.hide();
    // hide timeZone option
    fields.timeZoneContainer.hide();
    // hide color option
    fields.colorContainer.hide();
    fields.subjectLabel.html("Title");
    fields.locationLabel.html("Where");
    fields.fromLabel.html("Start");
    fields.toLabel.html("End");
    fields.resourceLabel.html("Calendar");
    let buttonElement = document.createElement("BUTTON");
    buttonElement.innerText = 'Print';
    buttonElement.style.cssFloat = 'right';
    buttonElement.style.marginLeft = '5px';
    buttonElement.id = 'PrintButton';
    fields.buttons[0].appendChild(buttonElement);
    let printButton: jqwidgets.jqxButton = jqwidgets.createInstance('#PrintButton', 'jqxButton', {
      width: 50,
      height: 25
    });
    this.printButton = printButton;
    printButton.addEventHandler('click', function () {
      let appointment = editAppointment;
      if (!appointment && printButton.disabled) {
        return;
      }
      let appointmentContent =
        "<table class='printTable'>" +
        "<tr>" +
        "<td class='label'>Title</td>" +
        "<td>" + fields.subject.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Start</td>" +
        "<td>" + fields.from.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>End</td>" +
        "<td>" + fields.to.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Where</td>" +
        "<td>" + fields.location.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Calendar</td>" +
        "<td>" + fields.resource.val() + "</td>" +
        "</tr>"
        + "</table>";
      let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
          '<!DOCTYPE html>\n' +
          '<html>\n' +
          '<head>\n' +
          '<meta charset="utf-8" />\n' +
          '<title>jQWidgets Scheduler</title>\n' +
          '<style>\n' +
          '.printTable {\n' +
          'border-color: #aaa;\n' +
          '}\n' +
          '.printTable .label {\n' +
          'font-weight: bold;\n' +
          '}\n' +
          '.printTable td{\n' +
          'padding: 4px 3px;\n' +
          'border: 1px solid #DDD;\n' +
          'vertical-align: top;\n' +
          '}\n' +
          '</style>' +
          '</head>\n' +
          '<body>\n' + appointmentContent + '\n</body>\n</html>';
      try {
        document.write(pageContent);
        document.close();
      }
      catch (error) {
      }
      newWindow.print();
    });
  };

  editDialogOpen = (dialog, fields, editAppointment) => {
    if (!editAppointment && this.printButton) {
      this.printButton.setOptions({ disabled: true });
    }
    else if (editAppointment && this.printButton) {
      this.printButton.setOptions({ disabled: false });
    }
  };

  editDialogKeyDown = (dialog?, fields?, editAppointment?, event?) => {
  };


  editDialogClose = (dialog, fields, editAppointment) => {
  };

  @ViewChild('schedulerReference', { static: false }) scheduler: jqxSchedulerComponent;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateAppointments(): any {
    let appointments = new Array();
    let appointment1 = {
      id: "id1",
      description: "George brings projector for presentations.",
      location: "",
      subject: "Quarterly Project Review Meeting",
      calendar: "Room 1",
      start: new Date(2020, 10, 23, 9, 0, 0),
      end: new Date(2020, 10, 23, 16, 0, 0)
    };
    let appointment2 = {
      id: "id2",
      description: "",
      location: "",
      subject: "IT Group Mtg.",
      calendar: "Room 2",
      start: new Date(2020, 10, 24, 10, 0, 0),
      end: new Date(2020, 10, 24, 15, 0, 0)
    };
    let appointment3 = {
      id: "id3",
      description: "",
      location: "",
      subject: "Course Social Media",
      calendar: "Room 3",
      start: new Date(2020, 10, 27, 11, 0, 0),
      end: new Date(2020, 10, 27, 13, 0, 0)
    };
    let appointment4 = {
      id: "id4",
      description: "",
      location: "",
      subject: "New Projects Planning",
      calendar: "Room 2",
      start: new Date(2020, 10, 23, 16, 0, 0),
      end: new Date(2020, 10, 23, 18, 0, 0)
    };
    let appointment5 = {
      id: "id5",
      description: "",
      location: "",
      subject: "Interview with James",
      calendar: "Room 1",
      start: new Date(2020, 10, 25, 15, 0, 0),
      end: new Date(2020, 10, 25, 17, 0, 0)
    };
    let appointment6 = {
      id: "id6",
      description: "",
      location: "",
      subject: "Interview with Nancy",
      calendar: "Room 4",
      start: new Date(2020, 10, 26, 14, 0, 0),
      end: new Date(2020, 10, 26, 16, 0, 0)
    };
    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);
    appointments.push(appointment5);
    appointments.push(appointment6);
    return appointments;
  };


  logout() {
    console.log('wylogowuję');
  }

  onAdd($event: any) {
    console.log($event);
  }

  ngAfterViewInit(): void {
   // this.scheduler.ensureAppointmentVisible('id1');
  }

}
