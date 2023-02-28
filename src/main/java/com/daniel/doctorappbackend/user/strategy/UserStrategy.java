package com.daniel.doctorappbackend.user.strategy;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import com.daniel.doctorappbackend.medicalservice.exception.MedicalServiceNotFoundException;
import com.daniel.doctorappbackend.specialization.exception.SpecializationNotFoundException;
import com.daniel.doctorappbackend.user.exception.UserExistException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import com.daniel.doctorappbackend.user.model.dto.CreateUserRequest;
import com.daniel.doctorappbackend.user.model.dto.UserResponse;

public interface UserStrategy<T extends UserResponse>{
    T buildUser(String email, String password) throws UserNotFoundException;
    <U extends CreateUserRequest> T createUser(U createUserRequest) throws UserExistException, SpecializationNotFoundException, CityNotFoundException, MedicalServiceNotFoundException;
}
