package com.daniel.doctorappbackend.availabilitydoctor.repository;

import com.daniel.doctorappbackend.availabilitydoctor.model.AvailabilityDoctorEntity;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface AvailabilityDoctorRepository extends CrudRepository<AvailabilityDoctorEntity, Long> {
    List<AvailabilityDoctorEntity> findAllByDoctorId(Long doctorId);
}
