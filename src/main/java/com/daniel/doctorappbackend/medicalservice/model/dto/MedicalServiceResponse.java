package com.daniel.doctorappbackend.medicalservice.model.dto;

import com.daniel.doctorappbackend.specialization.model.dto.SpecializationResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.sql.Time;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MedicalServiceResponse {
    public Long id;
    public String name;
    public Time length;
    private SpecializationResponse specialization;
}
