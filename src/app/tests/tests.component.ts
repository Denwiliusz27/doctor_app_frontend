import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, AfterViewInit {

  printButton: any = null;
  myDate = new Date();
  appointments = [];

  @ViewChild('schedulerReference', { static: false }) scheduler: jqxSchedulerComponent;
  ngAfterViewInit(): void {
    this.scheduler.ensureAppointmentVisible('id1');
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }

  generateAppointments(): any {
    let appointments = new Array();
    /*let appointment1 = {
      id: 'id1',
      description: 'George brings projector for presentations.',
      location: '',
      subject: 'Quarterly Project Review Meeting',
      calendar: 'Room 1',
      start: new Date(2020, 10, 23, 9, 0, 0),
      end: new Date(2020, 10, 23, 16, 0, 0)
    };
    let appointment2 = {
      id: 'id2',
      description: '',
      location: '',
      subject: 'IT Group Mtg.',
      calendar: 'Room 2',
      start: new Date(2020, 10, 24, 10, 0, 0),
      end: new Date(2020, 10, 24, 15, 0, 0)
    };
    appointments.push(appointment1);
    appointments.push(appointment2);*/

    return appointments;
  };
  source: any =
    {
      dataType: 'array',
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        // { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.generateAppointments()
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();
  appointmentDataFields: any =
    {
      from: 'start',
      to: 'end',
      id: 'id',
      description: 'description',
      location: 'location',
      subject: 'subject',
      /* resourceId: 'calendar'*/
    };
  resources: any =
    {
      colorScheme: 'scheme05',
      dataField: 'calendar',
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [                                                           // quarterHour
      { type: 'weekView', showWeekends: true, timeRuler: { scale: 'half-hour', formatString: 'HH:mm', hidden: false }, workTime:
          {
            fromDayOfWeek: 1,
            toDayOfWeek: 6,
            fromHour: 7,
            toHour: 21
          } },
    ];

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
    console.log(fields);
    console.log(this.myDate);
    fields.repeatContainer.hide();
    fields.timeZoneContainer.hide();
    fields.colorContainer.hide();
    fields.subjectContainer.hide();
    fields.repeatContainer.hide();
    fields.locationContainer.hide();
    fields.fromContainer.hide();
    fields.toContainer.hide();
    fields.resourceContainer.hide();
    fields.allDayContainer.hide();
    fields.descriptionContainer.hide();

    fields.statusLabel.html('Czy chcesz dodać swoją dyspozycyjność?');
    fields.status.hide(); // remove()
    console.log(fields.statusContainer);
    const element = fields.statusLabel.style;


    /*   const child2: [] = fields.statusContainer.children;
       fields.statusContainer.remove(child2);*/
    console.log(fields.statusContainer);
    const dziecko = fields.statusContainer.style;
    console.log(dziecko);

    const child = fields.statusContainer.children[0];

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
  /**
   * called when the dialog is opened. Returning true as a result disables the built-in handler.
   * @param {Object} dialog - jqxWindow's jQuery object.
   * @param {Object} fields - Object with all widgets inside the dialog.
   * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
   */
  editDialogOpen = (dialog, fields, editAppointment) => {
    console.log('jestem tutaj');
    if (!editAppointment && this.printButton) {
      this.printButton.setOptions({ disabled: true });
    }
    else if (editAppointment && this.printButton) {
      fields.statusLabel.html('Czy na pewno chcesz usunąć dyspozycyjność?');
      this.printButton.setOptions({ disabled: false });
    }
  };

  editDialogClose = (dialog, fields, editAppointment) => {
    console.log('wychodzę');
    console.log(dialog);
    console.log(fields);
    console.log(editAppointment);
    console.log(fields.subject.val());
    console.log(fields.from.val());
    console.log(fields.to.val());
    console.log(this.appointments);
  };

  AppointmentAdd() {
    console.log('add');
  }

  AppointmentClick() {
    console.log('dodaje');
  }

  ngOnInit(): void {
  }
}
