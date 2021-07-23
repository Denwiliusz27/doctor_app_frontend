import {CreateDoctorService} from './create-doctor-service';

export interface CreateUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export type CreatePatientRequest = {
  pesel: string;
} & CreateUserRequest;

export type CreateDoctorRequest = {
  description: string;
  phoneNumber: string;
  address: string;
  specializationId: number;
  cityId: number;
  medicalServices: CreateDoctorService[];
} & CreateUserRequest;
