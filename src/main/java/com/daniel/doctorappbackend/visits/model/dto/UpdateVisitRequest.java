package com.daniel.doctorappbackend.visits.model.dto;

import lombok.Data;

@Data
public class UpdateVisitRequest {
    private Long id;
    private Long patientId;
    private Long serviceId;
}
