import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Doctor} from '../model/user/user';

@Injectable({providedIn: 'root'})
export class DisplayDoctorOverviewSiteService {
  private _displayParams = new BehaviorSubject<{
    doctor: Doctor
  }>(null);
  readonly displayParams$ = this._displayParams.asObservable();

  constructor() {
  }

  displayDoctor(doctor: Doctor): void {
    console.log('Doctor: ' + doctor.name + ', ' + doctor.surname);
    this._displayParams.next({doctor});
  }
}
