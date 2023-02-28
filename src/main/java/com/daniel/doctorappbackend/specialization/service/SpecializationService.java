package com.daniel.doctorappbackend.specialization.service;

import com.daniel.doctorappbackend.specialization.repository.SpecializationRepository;
import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpecializationService {
    private final SpecializationRepository specializationRepository;

    public Optional<SpecializationEntity> findById(Long id) {
        return this.specializationRepository.findById(id);
    }
}
