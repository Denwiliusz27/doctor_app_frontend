package com.daniel.doctorappbackend.user.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class PatientResponse extends UserResponse {
    private String pesel;
}
