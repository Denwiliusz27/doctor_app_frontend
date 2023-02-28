package com.daniel.doctorappbackend.user.service;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import com.daniel.doctorappbackend.medicalservice.exception.MedicalServiceNotFoundException;
import com.daniel.doctorappbackend.specialization.exception.SpecializationNotFoundException;
import com.daniel.doctorappbackend.user.exception.InvalidPasswordException;
import com.daniel.doctorappbackend.user.exception.UserExistException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import com.daniel.doctorappbackend.user.model.UserEntity;
import com.daniel.doctorappbackend.user.model.UserRole;
import com.daniel.doctorappbackend.user.model.dto.CreateUserRequest;
import com.daniel.doctorappbackend.user.model.dto.UserResponse;
import com.daniel.doctorappbackend.user.repository.UserRepository;
import com.daniel.doctorappbackend.user.strategy.UserStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final Map<UserRole, UserStrategy<? extends UserResponse>> userStrategyMap;

    public UserResponse findUser(String email, String password, UserRole role) throws UserNotFoundException, InvalidPasswordException {
        UserEntity userEntity = userRepository.findUserByEmailAndRole(email, role).orElseThrow(UserNotFoundException::new);
        if (!userEntity.getPassword().equals(password)){
            throw new InvalidPasswordException();
        }
        return this.userStrategyMap.get(userEntity.getRole()).buildUser(email, password);
    }

    public <T extends CreateUserRequest> UserResponse createUser(T createUserRequest, UserRole role) throws UserExistException, SpecializationNotFoundException, CityNotFoundException, MedicalServiceNotFoundException {
        UserEntity userEntity = userRepository.findUserByEmail(createUserRequest.getEmail()).orElse(null);
        if (userEntity != null){
            throw new UserExistException();
        }
        return this.userStrategyMap.get(role).createUser(createUserRequest);
    }
}
