import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Specialization} from '../model/specialization/specialization';
import {serverUrl} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';
import {City} from '../model/city/city';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _cities$ = this.http.get<City[]>(`${serverUrl}/cities`)
    .pipe(
      shareReplay(1)
    );

  get cities$(): Observable<City[]> {
    return this._cities$;
  }

  constructor(private readonly http: HttpClient) {
  }
}
