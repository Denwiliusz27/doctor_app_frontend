package com.daniel.doctorappbackend.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {
    List<PatientEntity> findAll();
    Optional<PatientEntity> findByUserEmailAndUserPassword(String email, String password);
}
