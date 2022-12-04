import {MedicalService} from '../medical-service/medical-service';

export interface DoctorService {
  id: number;
  price: number;
  doctorId: number;
  medicalService: MedicalService;
}
