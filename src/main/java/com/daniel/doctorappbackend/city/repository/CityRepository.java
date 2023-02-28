package com.daniel.doctorappbackend.city.repository;

import com.daniel.doctorappbackend.city.model.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<CityEntity, Long> {
    Optional<CityEntity> findById(Long id);
}
