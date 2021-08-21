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
