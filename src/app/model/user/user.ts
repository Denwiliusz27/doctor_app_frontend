import {DoctorService} from '../doctor-service/doctor-service';
import {City} from '../city/city';
import {Specialization} from '../specialization/specialization';

export interface User {
  userId: number;
  id: number;
  name: string;
  surname: string;
  email: string;
  userRole: UserRole;
}

export type Patient = {
  pesel: string;
} & User;

export type Doctor = {
  address: string;
  phoneNumber: string;
  description: string;
  specialization: Specialization;
  city: City;
  doctorServices: DoctorService[];
} & User;

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR'
}

export interface LoginUser{
  email: string;
  password: string;
}

