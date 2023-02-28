package com.daniel.doctorappbackend.user.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreatePatientRequest extends CreateUserRequest{
    private String pesel;
}
