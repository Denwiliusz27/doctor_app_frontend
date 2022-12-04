import {Doctor, Patient} from '../user/user';
import {DoctorService} from '../../services/doctor.service';

export interface Visit{
  id: number;
  patientId: number;
  doctorId: number;
  medicalServiceId: number;
  availabilityId: number;
  from: string;
  to: string;
}

export interface UpdateVisitRequest {
  id: number;
  patientId: number;
  serviceId: number;
}

export interface VisitDetails {
  id: number;
  patient: Patient;
  doctor: Doctor;
  from: string;
  to: string;
  service: DoctorService;
}

export enum VisitType {
  ALL = 'ALL',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER'
}
