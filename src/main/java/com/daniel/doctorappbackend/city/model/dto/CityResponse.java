package com.daniel.doctorappbackend.city.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CityResponse {
    private Long id;
    private String name;
}
