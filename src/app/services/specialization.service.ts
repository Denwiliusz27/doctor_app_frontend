import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Specialization} from '../model/specialization/specialization';
import {serverUrl} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class SpecializationService {
  private _specializations$ = this.http.get<Specialization[]>(`${serverUrl}/specializations`)
    .pipe(
    shareReplay(1)
    );

  get specializations$(): Observable<Specialization[]> {
    return this._specializations$;
  }

  constructor(private readonly http: HttpClient) { }
}
