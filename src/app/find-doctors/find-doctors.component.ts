import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Doctor} from '../model/user/user';
import {CityService} from '../services/city.service';
import {SpecializationService} from '../services/specialization.service';
import {DoctorStrategy} from '../auth/strategy/doctor-strategy';
import {FindDoctorsService} from '../services/find-doctors.service';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit, OnDestroy {
  readonly cities$ = this.cityService.cities$; // lista specjalizacji
  selectedSpecializationId: number;
  readonly specializations$ = this.specializationService.specializations$; // lista specjalizacji
  selectedCityId: number;
  options: string[] = ['wizyty', 'wyniki'];
  doctors: Doctor[] = [];
  subscription: Subscription;

  constructor(private authService: AuthService, private cityService: CityService, private specializationService: SpecializationService,
              private doctorStrategy: DoctorStrategy, private findDoctorService: FindDoctorsService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.findDoctorService.searchParams$
      .pipe(
        filter(Boolean),
        tap(({cityId, specializationId}) => {
          this.selectedSpecializationId = specializationId;
          this.selectedCityId = cityId;
        }),
        mergeMap(({cityId, specializationId}) => this.doctorStrategy.findDoctorsByCityIdAndSpecializationId(cityId, specializationId))
      ).subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/pacjent-wyniki-badań');
    }
    console.log('przekierowuje do ' + option);
  }

  findDoctors() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
