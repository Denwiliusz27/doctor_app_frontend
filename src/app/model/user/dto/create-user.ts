export interface CreateUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export type CreatePatientRequest = {
  pesel: string;
} & CreateUserRequest;
