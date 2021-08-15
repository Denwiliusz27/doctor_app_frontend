import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DisplayDoctorOverviewSiteService} from '../services/display-doctor-overview-site.service';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {Doctor} from '../model/user/user';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FindDoctorsService} from '../services/find-doctors.service';

@Component({
  selector: 'app-doctor-overview-site',
  templateUrl: './doctor-overview-site.component.html',
  styleUrls: ['./doctor-overview-site.component.css']
})
export class DoctorOverviewSiteComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  doctor: Doctor;
  isPhoneNumberGiven = false;
  isDescriptionGiven = false;
  options: string[] = ['lekarze', 'wizyty', 'wyniki'];

  constructor(private router: Router, private displayDoctorOverviewSiteService: DisplayDoctorOverviewSiteService,
              private authService: AuthService, private findDoctorService: FindDoctorsService) {}

  ngOnInit(): void {
    this.subscription = this.displayDoctorOverviewSiteService.displayParams$
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
      ).subscribe();
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
    this.subscription.unsubscribe();
  }

}
