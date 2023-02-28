package com.daniel.doctorappbackend.doctorServices.service;

import com.daniel.doctorappbackend.doctorServices.model.DoctorServiceEntity;
import com.daniel.doctorappbackend.doctorServices.repository.DoctorServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorServiceRepository doctorServiceRepository;

    public Optional<DoctorServiceEntity> findById(Long id){
        return this.doctorServiceRepository.findById(id);
    }

    public List<DoctorServiceEntity> findByDoctorId(Long id){
        return this.doctorServiceRepository.findAllByDoctorId(id);
    }

    public DoctorServiceEntity add(DoctorServiceEntity doctorServiceEntity){
        return doctorServiceRepository.save(doctorServiceEntity);
    }

    public Optional<DoctorServiceEntity> findByIdAndDoctorId(Long id, Long doctorId) {
        return this.doctorServiceRepository.findByServiceIdAndDoctorId(id, doctorId);
    }
}
