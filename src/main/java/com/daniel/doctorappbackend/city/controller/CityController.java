package com.daniel.doctorappbackend.city.controller;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import com.daniel.doctorappbackend.city.service.CityService;
import com.daniel.doctorappbackend.user.model.dto.CityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController {
    private final CityService cityService;

    @GetMapping()
    public List<CityResponse> getAllCities(){
        return this.cityService.findAll();
    }
}
