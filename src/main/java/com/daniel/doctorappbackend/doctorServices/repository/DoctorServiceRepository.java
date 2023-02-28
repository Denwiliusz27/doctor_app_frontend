package com.daniel.doctorappbackend.doctorServices.repository;

import com.daniel.doctorappbackend.doctorServices.model.DoctorServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorServiceRepository extends JpaRepository<DoctorServiceEntity, Long> {
    List<DoctorServiceEntity> findAllByDoctorId(Long doctorId);
    Optional<DoctorServiceEntity> findByServiceIdAndDoctorId(Long id, Long doctorId);
}
