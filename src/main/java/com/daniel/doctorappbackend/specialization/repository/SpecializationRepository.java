package com.daniel.doctorappbackend.specialization.repository;

import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpecializationRepository extends JpaRepository<SpecializationEntity, Long> {
    List<SpecializationEntity> findAll();
}
