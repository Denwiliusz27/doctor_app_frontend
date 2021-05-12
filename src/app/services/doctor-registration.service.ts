import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegistrationService {

  constructor() { }

  getServicesBySpecialization(value: string){
    if (value === 'dentysta') {
      return ['badanie', 'konultacje'];
    } else if (value === 'kardiolog'){
      return ['badanie', 'konsultacje kardiolog', 'testy', 'proby  wysilkowe', 'alergeny'];
    }
  }
}
