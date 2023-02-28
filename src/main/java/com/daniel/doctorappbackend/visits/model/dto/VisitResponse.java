package com.daniel.doctorappbackend.visits.model.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Date;

@Data
@Builder
public class VisitResponse {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private Long medicalServiceId;
    private Long availabilityId;
    private Date from;
    private Date to;
}
