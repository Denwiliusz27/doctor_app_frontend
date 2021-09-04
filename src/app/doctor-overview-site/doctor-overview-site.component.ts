import {Component, OnInit, ViewChild} from '@angular/core';
import {Doctor, Patient} from '../model/user/user';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FindDoctorsService} from '../services/find-doctors.service';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';
import {View} from '@syncfusion/ej2-angular-schedule';
import {AvailabilityDoctorService} from '../services/availability-doctor.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {VisitService} from '../services/visit.service';
import {Visit} from '../model/visit/visit';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-doctor-overview-site',
  templateUrl: './doctor-overview-site.component.html',
  styleUrls: ['./doctor-overview-site.component.css']
})
export class DoctorOverviewSiteComponent implements OnInit {
  doctor: Doctor;
  isPhoneNumberGiven = false;
  isDescriptionGiven = false;
  options: string[] = ['wizyty', 'znajdź lekarzy'];

  registrationAccepted = false;
  submitted = false;
  selectedServiceId: number;
  selectedDate: string;
  selectedVisit: number;
  visitMap = new Map<string, Visit[]>();
  currentDate;
  currentHour;
  currentMinute;
  logoutStatus = false;

  appointmentRegistrationFormGroup = new FormGroup({
    dateFrom: new FormControl('', [
      Validators.required
    ]),
    dateTo: new FormControl('', [
      Validators.required
    ]),
    patientId: new FormControl('', [
      Validators.required
    ]),
    doctorAvailabilityId: new FormControl('', [
      Validators.required
    ]),
    serviceId: new FormControl('', [
      Validators.required
    ])
  });


  @ViewChild('schedulerReference', { static: false }) scheduler: jqxSchedulerComponent;

  addedAppointments: any;
  setView: View = 'Week';
  scheduleViews: View[] = ['Week', 'WorkWeek'];
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
      localData: []
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();
  appointmentDataFields: jqwidgets.SchedulerAppointmentDataFields =
    {
      from: 'start',
      to: 'end',
      id: 'id',
      description: 'description',
      location: 'location',
      subject: 'subject',
      readOnly: true,
      resizable: false,
      draggable: false
      /* resourceId: 'calendar'*/
    };
  resources: jqwidgets.SchedulerResources =
    {
      colorScheme: 'scheme05',
      dataField: 'calendar',
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [
      {
        type: 'weekView',
        showWeekends: true,
        timeRuler: {
          scale: 'half-hour', formatString: 'HH:mm',
          scaleStartHour: 8, scaleEndHour: 20,
          hidden: false
        }, workTime:
          {
            fromDayOfWeek: 1,
            toDayOfWeek: 5,
            fromHour: 7,
            toHour: 21
          }
      }
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
    loadingErrorMessage: 'ERROR',
    editDialogTitleString: 'Usuwanie godzin dyspozycyjności',
    editDialogCreateTitleString: 'Tworzenie nowych godzin dyspozycyjności',
    contextMenuEditAppointmentString: 'Usuń dyspozycyjność',
    contextMenuCreateAppointmentString: 'Ustaw dyspozycyjność',
    editDialogSaveString: 'Ustaw',
    editDialogDeleteString: 'Usuń',
    editDialogCancelString: 'Anuluj',
    editDialogRepeatString: 'Powtórz',
    editDialogRepeatEveryString: 'Dzisiaj',
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
    editDialogStatuses:
      {
        free: 'Wolny',
        tentative: 'wstępnie',
        busy: 'zatrudniony',
        outOfOffice: 'poza gabinetem'
      }
  };


  constructor(private router: Router, private authService: AuthService, private findDoctorService: FindDoctorsService,
              private readonly availabilityDoctorService: AvailabilityDoctorService, private visitService: VisitService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.doctor = this.authService.doctor;
    if (this.doctor.phoneNumber){
      this.isPhoneNumberGiven = true;
    }
    if (this.doctor.description){
      this.isDescriptionGiven = true;
    }

    this.setCurrentTime();

    this.visitService.getFreeVisitsByDoctorId(this.doctor.id).subscribe(visits => {
      visits.forEach(v => {
        const splitDate = v.from.split('T')[0];
        const vs = this.visitMap.get(splitDate) ?? [];
        vs.push(v);
        this.visitMap.set(splitDate, vs);
      });

      // console.log('obecna: ', this.currentDate);
      //
      // visits.forEach(v => {
      //   // console.log('wizyty: ', v.from);
      //
      //   if (v.from < this.currentDate){
      //     const index = visits.indexOf(v, 0);
      //     if (index > -1) {
      //       // console.log('usuwam: ', v.from);
      //       visits.splice(index, 1);
      //     }
      //   } else {
      //    //  console.log('zostaje: ', v.from);
      //   }
      // });

      visits.map(this.buildAppointment).forEach(visit => {
        this.scheduler.addAppointment(visit);
      });
      console.log(this.visitMap);
    });
  }

  get currentFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.appointmentRegistrationFormGroup.controls;
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    } else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(undefined, undefined);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }

  buildAppointment(visit: Visit): any {
    return {
      subject: ' ',
      start: new Date(visit.from),
      end: new Date(visit.to),
      resizable: false,
      draggable: false,
      readOnly: true,
      description: visit.id.toString(),
      };
  }

  onAppointmentAdd(obj): void {}

  onAppointmentDelete(obj): void {}

  onSelectDate() {
    this.selectedVisit = undefined;
  }

  isDateSelected(): boolean {
    if (this.selectedDate === undefined) {
      return false;
    } else {
      return true;
    }
  }

  isHourSelected(): boolean{
    if (this.selectedVisit === undefined) {
      return false;
    } else {
      return true;
    }
  }

  isServiceSelected(): boolean {
    if (this.selectedServiceId === undefined) {
      return false;
    } else {
      return true;
    }
  }

  setCurrentTime(): void{
    // this.currentDate = this.datePipe.transform(new Date(), 'MM d, y, H:mm');
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    // this.currentDate = '2021-08-23 09:15:00';
  }

  registerAppointment(): void {
    this.submitted = true;

    if (!this.isServiceSelected() || !this.isDateSelected() || !this.isHourSelected()){
      console.log('nie wypełniono poprawnie pól');
      return;
    }

    this.visitService.updateVisit({
      id: this.selectedVisit,
      patientId: (this.authService.user as Patient).id,
      serviceId: this.selectedServiceId
    }).subscribe(response => {
      setTimeout(() => {
        this.authService.setSelectedVisit(response.id);
        this.router.navigateByUrl('/wizyta-pacjenta');
      }, 1000);
    });
    this.registrationAccepted = true;

   /* (async () => {
      await this.updateVisit();
    })();*/


    // this.setVisit();

    console.log('vizyta z authServ: ', this.authService.visit);

    /*this.visitService.getVisitWithDoctorById(this.selectedVisit).subscribe(res => {
      console.log('nowa wizyta: ', res);
    });*/



/*
    setTimeout(() => {
      this.router.navigateByUrl('/wizyta-pacjenta');
    }, 1000);*/
  }

  updateVisit(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.visitService.updateVisit({
          id: this.selectedVisit,
          patientId: (this.authService.user as Patient).id,
          serviceId: this.selectedServiceId
        }).subscribe();
        this.registrationAccepted = true;
      }, 1000);
    });
  }

 /* setVisit(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.visitService.getVisitWithDoctorById(this.selectedVisit).subscribe( response => {
          this.authService.setSelectedVisit(response);
          // console.log('wizyta: ', this.authService.visit);
        });
      }, 1000);
    });
*/
}
