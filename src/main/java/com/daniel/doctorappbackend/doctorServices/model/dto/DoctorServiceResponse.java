package com.daniel.doctorappbackend.doctorServices.model.dto;

import com.daniel.doctorappbackend.medicalservice.model.dto.MedicalServiceResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorServiceResponse {
    private Long id;
    private Long price;
    private Long doctorId;
    private MedicalServiceResponse medicalService;
}
