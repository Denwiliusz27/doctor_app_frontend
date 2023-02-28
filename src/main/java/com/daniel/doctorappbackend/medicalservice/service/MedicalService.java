package com.daniel.doctorappbackend.medicalservice.service;

import com.daniel.doctorappbackend.medicalservice.model.MedicalServiceEntity;
import com.daniel.doctorappbackend.medicalservice.model.dto.MedicalServiceResponse;
import com.daniel.doctorappbackend.medicalservice.repository.MedicalServiceRepository;
import com.daniel.doctorappbackend.specialization.model.dto.SpecializationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalService {
    private final MedicalServiceRepository medicalServiceRepository;

    public List<MedicalServiceResponse> findAll(){
        return this.medicalServiceRepository.findAll()
                .stream()
                .map(this::mapToMedicalServiceResponse)
                .collect(Collectors.toList());
    }

    public MedicalServiceResponse mapToMedicalServiceResponse(MedicalServiceEntity medicalServiceEntity) {
        return MedicalServiceResponse.builder()
                .id(medicalServiceEntity.getId())
                .name(medicalServiceEntity.getName())
                .specialization(SpecializationResponse.builder()
                        .id(medicalServiceEntity.getSpecialization().getId())
                        .name(medicalServiceEntity.getSpecialization().getName())
                        .build()
                )
                .build();
    }

    public List<MedicalServiceResponse> findBySpecializationId(Long specializationId){
        return this.medicalServiceRepository.findAllBySpecializationId(specializationId)
                .stream()
                .map(this::mapToMedicalServiceResponse)
                .collect(Collectors.toList());
    }

    public Optional<MedicalServiceEntity> findById(Long id){
        return this.medicalServiceRepository.findById(id);
    }

    public Optional<MedicalServiceResponse> findMedicalServiceById(Long id){
        return this.medicalServiceRepository.findById(id).map(this::mapToMedicalServiceResponse);
    }
}
