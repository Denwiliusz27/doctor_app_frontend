package com.daniel.doctorappbackend.availabilitydoctor.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@Data
public class CreateAvailabilityDoctorRequest {
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date from;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date to;
    private Long doctorId;
}
