package com.daniel.doctorappbackend.medicalservice.controller;

import com.daniel.doctorappbackend.medicalservice.model.dto.MedicalServiceResponse;
import com.daniel.doctorappbackend.medicalservice.service.MedicalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/medical-services")
@RequiredArgsConstructor
public class MedicalServiceController {
    private final MedicalService medicalService;

    @GetMapping("/specialization/{specializationId}")
    public List<MedicalServiceResponse> findBySpecializationID(@PathVariable Long specializationId){
        return medicalService.findBySpecializationId(specializationId);
    }

    @GetMapping()
    public List<MedicalServiceResponse> getAllServices(){
        return medicalService.findAll();
    }

    @GetMapping("/id/{serviceId}")
    public Optional<MedicalServiceResponse> findById(@PathVariable Long serviceId){
        return medicalService.findMedicalServiceById(serviceId);
    }
}
