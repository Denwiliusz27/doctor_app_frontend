import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FindDoctorsService {
  private _searchParams = new BehaviorSubject<{
    cityId: number,
    specializationId: number
  }>(null);
  readonly searchParams$ = this._searchParams.asObservable();

  constructor() {
  }

  searchDoctors(cityId: number, specializationId: number): void {
    this._searchParams.next({cityId, specializationId});
  }
}
