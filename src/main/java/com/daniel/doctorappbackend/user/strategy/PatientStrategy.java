package com.daniel.doctorappbackend.user.strategy;

import com.daniel.doctorappbackend.patient.PatientEntity;
import com.daniel.doctorappbackend.patient.PatientRepository;
import com.daniel.doctorappbackend.user.repository.UserRepository;
import com.daniel.doctorappbackend.user.exception.UserExistException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import com.daniel.doctorappbackend.user.model.UserEntity;
import com.daniel.doctorappbackend.user.model.UserRole;
import com.daniel.doctorappbackend.user.model.dto.CreatePatientRequest;
import com.daniel.doctorappbackend.user.model.dto.CreateUserRequest;
import com.daniel.doctorappbackend.user.model.dto.PatientResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PatientStrategy implements UserStrategy<PatientResponse>{
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Override
    public PatientResponse buildUser(String email, String password) throws UserNotFoundException {
        return this.patientRepository.findByUserEmailAndUserPassword(email, password)
                .map(this::mapToPatientResponse)
                .orElseThrow(UserNotFoundException::new);
    }

    @Override
    public <U extends CreateUserRequest> PatientResponse createUser(U createUserRequest) throws UserExistException {
        CreatePatientRequest request = (CreatePatientRequest) createUserRequest;
        boolean exist = this.userRepository.existsUserEntityByEmail(createUserRequest.getEmail());

        if(exist){
            throw new UserExistException();
        }
        UserEntity userEntity = this.userRepository.save(
                UserEntity.builder()
                .name(createUserRequest.getName())
                .surname(createUserRequest.getSurname())
                .password(createUserRequest.getPassword())
                .email(createUserRequest.getEmail())
                        .role(UserRole.PATIENT)
                        .build()
        );
        PatientEntity patientEntity = this.patientRepository.save(
                PatientEntity.builder()
                .pesel(request.getPesel())
                        .user(userEntity)
                .build()
        );
        return this.mapToPatientResponse(patientEntity);
    }

    private PatientResponse mapToPatientResponse(PatientEntity patientEntity){
        return PatientResponse.builder()
                .name(patientEntity.getUser().getName())
                .surname(patientEntity.getUser().getSurname())
                .email(patientEntity.getUser().getEmail())
                .userId(patientEntity.getUser().getId())
                .id(patientEntity.getId())
                .pesel(patientEntity.getPesel())
                .userRole(patientEntity.getUser().getRole())
                .build();
    }

    public Optional<PatientEntity> findPatientById(Long id){
        return this.patientRepository.findById(id);
    }
}
