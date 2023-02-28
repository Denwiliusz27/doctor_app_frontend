package com.daniel.doctorappbackend.availabilitydoctor.model.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Date;

@Data
@Builder
public class AvailabilityDoctorResponse {
    private Date from;
    private Date to;
    private Long doctorId;
    private Long id;
}
