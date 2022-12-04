import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {serverUrl} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';
import {MedicalService} from '../model/medical-service/medical-service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class MedicalServices {
  private _medicalServices$ = this.http.get<MedicalService[]>(`${serverUrl}/medical-services`)
    .pipe(
      shareReplay(1)
    );

  get medicalServices$(): Observable<MedicalService[]> {
    return this._medicalServices$;
  }

  public findById(id: number): Observable<MedicalService[]>{
    return this.http.get<MedicalService[]>(`${serverUrl}/medical-services/specialization/${id}`);
  }

  constructor(private readonly http: HttpClient) {
  }
}
