package com.daniel.doctorappbackend.specialization.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpecializationResponse {
    private Long id;
    private String name;
}
