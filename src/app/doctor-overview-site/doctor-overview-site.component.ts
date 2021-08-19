import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';
import {Doctor} from '../model/user/user';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FindDoctorsService} from '../services/find-doctors.service';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';
import {View} from '@syncfusion/ej2-angular-schedule';
import {AvailabilityDoctorService} from '../services/availability-doctor.service';
import {AvailabilityDoctor} from '../model/availability-doctor/availability-doctor';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-doctor-overview-site',
  templateUrl: './doctor-overview-site.component.html',
  styleUrls: ['./doctor-overview-site.component.css']
})
export class DoctorOverviewSiteComponent implements OnInit, OnDestroy {
  doctor: Doctor;
  isPhoneNumberGiven = false;
  isDescriptionGiven = false;
  options: string[] = ['lekarze', 'wizyty', 'wyniki'];

  submitted = false;
  selectedServiceId: number;
  selectedDate: string;
  selectedHour: string;
  dates: string[] = ['02.09', '04.09', '05.09'];
  hours: string[] = ['10:30', '11:30', '12:00', '15:00'];

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
        showWeekends: false,
        timeRuler: {
          scale: 'half-hour', formatString: 'HH:mm',
          scaleStartHour: 8, scaleEndHour: 20,
          hidden: false
        }, workTime:
          {
            fromDayOfWeek: 1,
            toDayOfWeek: 6,
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
              private readonly availabilityDoctorService: AvailabilityDoctorService) {}

  ngOnInit(): void {
    this.doctor = this.authService.doctor;
    /*this.subscription = this.displayDoctorOverviewSiteService.displayParams$
      .pipe(
        filter(Boolean),
        tap(({doctor}) => {
          this.doctor = doctor;
          console.log(doctor.phoneNumber);
          console.log(doctor.description);

          if (doctor.phoneNumber){
            this.isPhoneNumberGiven = true;
          }
          if (doctor.description){
            this.isDescriptionGiven = true;
          }
        }),
        mergeMap(({doctor}) => {
          return doctor;
        })
      ).subscribe();*/
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
    } else if (option === 'lekarze') {
      this.findDoctorService.searchDoctors(undefined, undefined);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authService.clearDoctor();
/*
    this.subscription.unsubscribe();
*/
  }









  ngAfterViewInit(): void {
  }

  buildAppointment(availabilityDoctor: AvailabilityDoctor): any {
    return {
      subject: 'Dostępny',
      start: new Date(availabilityDoctor.from),
      end: new Date(availabilityDoctor.to),
      resizable: false,
      draggable: false,
      readOnly: false,
      description: availabilityDoctor.id.toString(),
    };
  }


  editDialogCreate = (dialog, fields) => {
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
    fields.repeatContainer.hide();
    fields.statusLabel.html('Czy chcesz dodać swoją dyspozycyjność?');
    fields.saveButton.on('click', () => {
      this.availabilityDoctorService.add({
        doctorId: this.authService.user.id,
        to: this.addedAppointments.to.toString(),
        from: this.addedAppointments.from.toString()
      }).pipe(
        catchError(() => {
          this.scheduler.deleteAppointment(this.addedAppointments.id);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.scheduler.setAppointmentProperty(this.addedAppointments.id, 'resizable', false);
          this.scheduler.setAppointmentProperty(this.addedAppointments.id, 'draggable', false);
          this.scheduler.setAppointmentProperty(this.addedAppointments.id, 'readOnly', false);
          this.scheduler.setAppointmentProperty(this.addedAppointments.id, 'subject', 'Dostępny');
          this.scheduler.setAppointmentProperty(this.addedAppointments.id, 'description', response.id.toString());
          this.scheduler.addAppointment(this.addedAppointments);
        }
      });
    });
    fields.status.hide();
  };

  editDialogOpen = (dialog, fields, editAppointment) => {
    fields.repeatContainer.hide();
    fields.statusLabel.html('Czy na pewno chcesz usunąć dyspozycyjność?');
  };

  editDialogClose = (dialog, fields, editAppointment) => {
    // console.log(dialog);
    // console.log(editAppointment);
    // console.log('dialog close');
    // console.log(dialog);
    // console.log(fields);
    // console.log(editAppointment);
    // console.log(fields.subject.val());
    // console.log(fields.from.val());
    // console.log(fields.to.val());
    // console.log(this.appointments);
  };

  onAppointmentAdd(obj): void {
    this.addedAppointments = obj.args.appointment;
  }


  onAppointmentDelete(obj): void {
    this.availabilityDoctorService.deleteById(obj.args.appointment.description).subscribe(() => {});
  }

  onSelectDate(): void {
    console.log(this.selectedDate);
  }

  isDateSelected(): boolean {
    if (this.selectedDate === undefined) {
      return false;
    } else {
      return true;
    }
  }

  onSelectHour(): void {
    console.log(this.selectedHour);
  }

  isHourSelected(): boolean{
    if (this.selectedHour === undefined) {
      return false;
    } else {
      return true;
    }
  }

  onSelectService(): void {
    console.log(this.selectedServiceId);
  }

  isServiceSelected(): boolean {
    if (this.selectedServiceId === undefined) {
      return false;
    } else {
      return true;
    }
  }

  registerAppointment(): void {
    this.submitted = true;

    if (!this.isServiceSelected() || !this.isDateSelected() || !this.isHourSelected()){
      console.log('nie wypełniono poprawnie pól');
      return;
    }

    console.log('rejestruje sie');
    console.log(this.selectedDate);
    console.log(this.selectedHour);
    console.log(this.selectedServiceId);
  }
}
