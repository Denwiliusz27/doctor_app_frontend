package com.daniel.doctorappbackend.user.model.dto;

import com.daniel.doctorappbackend.city.model.dto.CityResponse;
import com.daniel.doctorappbackend.doctorServices.model.dto.DoctorServiceResponse;
import com.daniel.doctorappbackend.specialization.model.dto.SpecializationResponse;
import com.daniel.doctorappbackend.visits.model.dto.VisitResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class DoctorResponse extends UserResponse {
    private String address;
    private String phoneNumber;
    private String description;
    private SpecializationResponse specialization;
    private CityResponse city;
    private List<DoctorServiceResponse> doctorServices;
    private List<VisitResponse> visits;
}
