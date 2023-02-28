package com.daniel.doctorappbackend.visits.controller;

import com.daniel.doctorappbackend.medicalservice.exception.MedicalServiceNotFoundException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import com.daniel.doctorappbackend.visits.exception.VisitNotFoundException;
import com.daniel.doctorappbackend.visits.model.VisitType;
import com.daniel.doctorappbackend.visits.model.dto.*;
import com.daniel.doctorappbackend.visits.service.VisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/visits")
@RequiredArgsConstructor
public class VisitController {
    public final VisitService visitService;

    @GetMapping()
    public List<VisitResponse> getFreeVisitsByDoctorId(@RequestParam(name = "doctorId") Long doctorId) {
        return this.visitService.findFreeVisits(doctorId);
    }

    @GetMapping("/patient")
    public List<VisitResponse> getVisitsByPatientId(@RequestParam(name = "patientId") Long patientId) {
        return this.visitService.findByPatientId(patientId);
    }

    @GetMapping("/id")
    public VisitResponse getVisitById(@RequestParam(name = "visitId") Long visitId) throws VisitNotFoundException {
        return this.visitService.getVisitById(visitId);
    }

    @GetMapping("/details/{visitId}")
    public VisitDetails getDetailsVisitById(@PathVariable(name = "visitId") Long visitId) throws VisitNotFoundException {
        return this.visitService.getDetailsVisit(visitId);
    }

    @GetMapping("/details-list-by-doctor/{doctorId}")
    public List<VisitDetails> getDetailsVisitByDoctorId(@PathVariable(name = "doctorId") Long doctorId,
                                                        @RequestParam(required = false, defaultValue = "ALL") VisitType type) throws VisitNotFoundException {
        return this.visitService.findVisitsByDoctorId(doctorId, type);
    }

    @GetMapping("/details-list-by-patient/{patientId}")
    public List<VisitDetails> getDetailsVisitByPatientId(@PathVariable(name = "patientId") Long patientId,
                                                         @RequestParam(required = false, defaultValue = "ALL") VisitType type) throws VisitNotFoundException {
        return this.visitService.findVisitsByPatientId(patientId, type);
    }

    @PutMapping()
    public VisitResponse updateVisit(@RequestBody() UpdateVisitRequest visitRequest) throws UserNotFoundException,
            VisitNotFoundException, MedicalServiceNotFoundException {
        return this.visitService.updateVisit(visitRequest);
    }

}

