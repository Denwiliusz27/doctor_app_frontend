package com.daniel.doctorappbackend.specialization.controller;

import com.daniel.doctorappbackend.specialization.repository.SpecializationRepository;
import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/specializations")
@RequiredArgsConstructor
public class SpecializationController {
    private final SpecializationRepository specializationRepository;

    @GetMapping
    public List<SpecializationEntity> getAllSpecializations(){
        return specializationRepository.findAll();
    }
}

