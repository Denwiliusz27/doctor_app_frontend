package com.daniel.doctorappbackend.city.service;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import com.daniel.doctorappbackend.city.repository.CityRepository;
import com.daniel.doctorappbackend.city.model.CityEntity;
import com.daniel.doctorappbackend.user.model.dto.CityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepository cityRepository;

    public List<CityResponse> findAll(){
        return this.cityRepository.findAll()
                .stream()
                .map(this::mapToCityResponse)
                .collect(Collectors.toList());
    }

    private CityResponse mapToCityResponse(CityEntity cityEntity) {
        return CityResponse.builder()
                .id(cityEntity.getId())
                .name(cityEntity.getName())
                .build();
    }

    public Optional<CityEntity> findEntityById(Long id){
        return this.cityRepository.findById(id);
    }
}
