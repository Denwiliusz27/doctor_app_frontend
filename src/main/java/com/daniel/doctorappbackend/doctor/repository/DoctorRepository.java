package com.daniel.doctorappbackend.doctor.repository;

import com.daniel.doctorappbackend.doctor.model.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends CrudRepository<DoctorEntity, Long> {
    List<DoctorEntity> findAll();
    Optional<DoctorEntity> findByUserEmailAndUserPassword(String email, String password);
    Optional<DoctorEntity> findByUserId(Long id);
    List<DoctorEntity> findByCityIdAndSpecializationId(Long cityId, Long specializationId);
    List<DoctorEntity> findByCityId(Long cityId);
    List<DoctorEntity> findBySpecializationId(Long specializationId);
}
