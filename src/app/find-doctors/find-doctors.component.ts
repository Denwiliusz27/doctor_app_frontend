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
  readonly cities$ = this.cityService.cities$;
  selectedSpecializationId: number;
  readonly specializations$ = this.specializationService.specializations$;
  selectedCityId: number;
  options: string[] = ['wizyty', 'znajdź lekarzy'];
  doctors: Doctor[] = [];
  subscription: Subscription;
  logoutStatus = false;

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
        mergeMap(({cityId, specializationId}) => {
          if (cityId && specializationId){
            return this.doctorStrategy.findDoctorsByCityIdAndSpecializationId(cityId, specializationId);
          } else if (specializationId) {
            return this.doctorStrategy.findDoctorsBySpecializationId(specializationId);
          } else if (cityId){
            return this.doctorStrategy.findDoctorsByCityId(cityId);
          } else {
            return this.doctorStrategy.findAllDoctors();
          }
        }
      )).subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }

  redirect(option: string): void {
    if (option === 'wizyty') {
      this.router.navigateByUrl('/pacjent-wizyty');
    }  else if (option === 'znajdź lekarzy') {
      this.findDoctorService.searchDoctors(this.selectedCityId, this.selectedSpecializationId);
      this.router.navigateByUrl('/znajdź-lekarzy');
    }
  }

  findDoctors() {
    this.findDoctorService.searchDoctors(this.selectedCityId, this.selectedSpecializationId);
  }

  displayDoctorSite(doctor: Doctor){
    this.authService.setSelectedDoctor(doctor);
    this.router.navigateByUrl('/strona-lekarza');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
