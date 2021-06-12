import {Injectable} from '@angular/core';
import {DoctorRegistrationModel, SelectedServices} from '../doctor-registration/doctor-registration.component';
import {HttpClient} from '@angular/common/http';
import {DoctorService, DoctorServiceService} from './doctor-service.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegistrationService {

  constructor(private http: HttpClient, private doctorService: DoctorServiceService) {
  }

  /*
  Jeśli podany email jest unikalny - tworzymy doktora i go zwracamy, w innym przypadku zwracamy nulla
   */
  addDoctor(doctor: DoctorRegistrationModel, selectedServices: SelectedServices[], emailExists: boolean) {
    console.log('wysylam doktora');
    console.log(doctor);
    this.http.post<DoctorRegistrationModel>('http://localhost:8080/lekarz/dodaj', doctor).subscribe(odpowiedz => {
      console.log(odpowiedz);
      if (odpowiedz === null) {
        emailExists = true;
      }
      this.addDoctorServicesIfDoctorExists(odpowiedz, selectedServices);
    });
  }

  prepareDoctorServices(doctorModel: DoctorRegistrationModel, selectedServices: SelectedServices[]): DoctorService[] {
    const doctorServices: DoctorService[] = [];
    for (const doctorS of selectedServices) {
      const temp = {
        doctorId: doctorModel['doctorId'],
        serviceId: doctorS.id,
        servicePrice: doctorS.price
      };
      doctorServices.push(temp);
    }
    return doctorServices;
  }

  /*
  Jeśli doktor z podanym mailem istnieje, to nie wysyłamy requesta żaby stworzyć dla niego usługi
   */
  addDoctorServicesIfDoctorExists(odpowiedz: DoctorRegistrationModel, selectedServices: SelectedServices[]) {
    if (odpowiedz !== null) {
      const doctorServices = this.prepareDoctorServices(odpowiedz, selectedServices);
      console.log(doctorServices);
      this.doctorService.addDoctorServices(doctorServices);
    }
  }


  getDoctorByEmailAddress(email: string) {
    return this.http.get<DoctorRegistrationModel>(`http://localhost:8080/lekarz/email/${email}`);
  }

}
