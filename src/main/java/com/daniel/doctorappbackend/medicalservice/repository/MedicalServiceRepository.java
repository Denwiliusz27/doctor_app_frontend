package com.daniel.doctorappbackend.medicalservice.repository;

import com.daniel.doctorappbackend.medicalservice.model.MedicalServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalServiceEntity, Long> {
    List<MedicalServiceEntity> findAllBySpecializationId(Long specializationId);
    Optional<MedicalServiceEntity> findById(Long id);
    List<MedicalServiceEntity> findAll();
}
