package com.daniel.doctorappbackend.user.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateDoctorRequest extends CreateUserRequest{
    private String description;
    private String phoneNumber;
    private String address;
    private Long specializationId;
    private Long cityId;
    private List<MedicalServiceDoctorRequest> medicalServices;
}
