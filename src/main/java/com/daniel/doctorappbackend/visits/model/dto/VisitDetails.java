package com.daniel.doctorappbackend.visits.model.dto;

import com.daniel.doctorappbackend.doctorServices.model.dto.DoctorServiceResponse;
import com.daniel.doctorappbackend.user.model.dto.DoctorResponse;
import com.daniel.doctorappbackend.user.model.dto.PatientResponse;
import lombok.Builder;
import lombok.Data;
import java.util.Date;

@Data
@Builder
public class VisitDetails {
    Long id;
    PatientResponse patient;
    DoctorResponse doctor;
    Date from;
    Date to;
    DoctorServiceResponse service;
}
