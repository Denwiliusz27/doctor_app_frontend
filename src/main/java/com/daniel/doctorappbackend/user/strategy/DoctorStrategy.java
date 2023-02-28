package com.daniel.doctorappbackend.user.strategy;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import com.daniel.doctorappbackend.city.model.CityEntity;
import com.daniel.doctorappbackend.city.model.dto.CityResponse;
import com.daniel.doctorappbackend.city.service.CityService;
import com.daniel.doctorappbackend.doctor.model.DoctorEntity;
import com.daniel.doctorappbackend.doctor.repository.DoctorRepository;
import com.daniel.doctorappbackend.doctorServices.model.DoctorServiceEntity;
import com.daniel.doctorappbackend.doctorServices.model.dto.DoctorServiceResponse;
import com.daniel.doctorappbackend.doctorServices.service.DoctorService;
import com.daniel.doctorappbackend.medicalservice.exception.MedicalServiceNotFoundException;
import com.daniel.doctorappbackend.medicalservice.model.dto.MedicalServiceResponse;
import com.daniel.doctorappbackend.medicalservice.service.MedicalService;
import com.daniel.doctorappbackend.specialization.exception.SpecializationNotFoundException;
import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import com.daniel.doctorappbackend.specialization.model.dto.SpecializationResponse;
import com.daniel.doctorappbackend.specialization.service.SpecializationService;
import com.daniel.doctorappbackend.user.model.dto.PatientResponse;
import com.daniel.doctorappbackend.user.repository.UserRepository;
import com.daniel.doctorappbackend.user.exception.UserExistException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import com.daniel.doctorappbackend.user.model.UserEntity;
import com.daniel.doctorappbackend.user.model.UserRole;
import com.daniel.doctorappbackend.user.model.dto.CreateDoctorRequest;
import com.daniel.doctorappbackend.user.model.dto.CreateUserRequest;
import com.daniel.doctorappbackend.user.model.dto.DoctorResponse;
import com.daniel.doctorappbackend.visits.service.VisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorStrategy implements UserStrategy<DoctorResponse>{
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final SpecializationService specializationService;
    private final CityService cityService;
    private final DoctorService doctorService;
    private final MedicalService medicalService;
    private final VisitService visitService;

    public Optional<DoctorEntity> findById(Long id) {
        return this.doctorRepository.findById(id);
    }

    @Override
    public DoctorResponse buildUser(String email, String password) throws UserNotFoundException {
        return this.doctorRepository.findByUserEmailAndUserPassword(email, password)
                .map(doctorEntity ->
                    this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId()))
                )
                .orElseThrow(UserNotFoundException::new);
    }

    @Override
    public <U extends CreateUserRequest> DoctorResponse createUser(U createUserRequest) throws UserExistException,
            SpecializationNotFoundException, CityNotFoundException, MedicalServiceNotFoundException {
        CreateDoctorRequest request = (CreateDoctorRequest) createUserRequest;
        boolean exist = this.userRepository.existsUserEntityByEmail(createUserRequest.getEmail());

        if(exist){
            throw new UserExistException();
        }

        SpecializationEntity specializationEntity = this.specializationService.findById(request.getSpecializationId())
                .orElseThrow(() -> new SpecializationNotFoundException(request.getSpecializationId()));

        CityEntity cityEntity = this.cityService.findEntityById(request.getCityId())
                .orElseThrow(() -> new CityNotFoundException(request.getCityId()));

        UserEntity userEntity = this.userRepository.save(
                UserEntity.builder()
                        .name(createUserRequest.getName())
                        .surname(createUserRequest.getSurname())
                        .password(createUserRequest.getPassword())
                        .email(createUserRequest.getEmail())
                        .role(UserRole.DOCTOR)
                        .build()
        );

        DoctorEntity doctorEntity = this.doctorRepository.save(
                DoctorEntity.builder()
                        .description(request.getDescription())
                        .address(request.getAddress())
                        .phoneNumber(request.getPhoneNumber())
                        .user(userEntity)
                        .specialization(specializationEntity)
                        .city(cityEntity)
                        .build()
        );

        List<DoctorServiceEntity> doctorServices = request.getMedicalServices()
                .stream()
                .map(medicalServiceDoctorRequest ->
                    this.medicalService.findById(medicalServiceDoctorRequest.getId())
                            .map(medicalServiceEntity -> this.doctorService.add(
                                    DoctorServiceEntity.builder()
                                            .doctor(doctorEntity)
                                            .price(medicalServiceDoctorRequest.getPrice())
                                            .service(medicalServiceEntity)
                                            .build()
                            )).orElseGet(null)
                )
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return this.mapToDoctorResponse(doctorEntity, doctorServices);
    }

    private DoctorResponse mapToDoctorResponse(DoctorEntity doctorEntity, List<DoctorServiceEntity> doctorServiceEntities) {
        return DoctorResponse.builder()
                .name(doctorEntity.getUser().getName())
                .surname(doctorEntity.getUser().getSurname())
                .email(doctorEntity.getUser().getEmail())
                .userId(doctorEntity.getUser().getId())
                .id(doctorEntity.getId())
                .description(doctorEntity.getDescription())
                .phoneNumber(doctorEntity.getPhoneNumber())
                .address(doctorEntity.getAddress())
                .userRole(doctorEntity.getUser().getRole())
                .specialization(
                        SpecializationResponse.builder()
                        .id(doctorEntity.getSpecialization().getId())
                        .name(doctorEntity.getSpecialization().getName())
                        .build()
                )
                .city(
                        CityResponse.builder()
                                .id(doctorEntity.getCity().getId())
                                .name(doctorEntity.getCity().getName())
                                .build()
                )
                .doctorServices(
                        doctorServiceEntities.stream()
                        .map(
                                doctorServiceEntity -> DoctorServiceResponse.builder()
                                .id(doctorServiceEntity.getId())
                                        .doctorId(doctorEntity.getId())
                                .medicalService(
                                        MedicalServiceResponse.builder()
                                        .id(doctorServiceEntity.getService().getId())
                                        .name(doctorServiceEntity.getService().getName())
                                        .length(doctorServiceEntity.getService().getLengthOfVisit())
                                        .build()
                                        )
                                .price(doctorServiceEntity.getPrice())
                                .build()
                                ).collect(Collectors.toList())
                )
                .visits(visitService.findByDoctorId(doctorEntity.getId()))
                .build();
    }

    public List<DoctorResponse> findDoctorByCityAndSpecialization(Long cityId, Long specializationId) {
        return this.doctorRepository.findByCityIdAndSpecializationId(cityId, specializationId)
                .stream()
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())))
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> findDoctorByCity(Long cityId) {
        return this.doctorRepository.findByCityId(cityId)
                .stream()
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())))
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> findDoctorBySpecialization(Long specializationId) {
        return this.doctorRepository.findBySpecializationId(specializationId)
                .stream()
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())))
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> findAll() {
        return this.doctorRepository.findAll()
                .stream()
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())))
                .collect(Collectors.toList());
    }

    public Optional<DoctorResponse> findDoctorById(Long doctorId) {
        return this.doctorRepository.findById(doctorId)
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())));
    }

    public Set<PatientResponse> findPatients(Long doctorId) {
        return this.visitService.findPatientByDoctorId(doctorId);
    }

    public Optional<DoctorResponse> findDoctorByUserId(Long id) {
        return this.doctorRepository.findByUserId(id)
                .map(doctorEntity -> this.mapToDoctorResponse(doctorEntity, this.doctorService.findByDoctorId(doctorEntity.getId())));
    }
}
