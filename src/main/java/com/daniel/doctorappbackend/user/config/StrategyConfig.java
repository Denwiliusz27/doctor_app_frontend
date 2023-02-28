package com.daniel.doctorappbackend.user.config;

import com.daniel.doctorappbackend.user.model.UserRole;
import com.daniel.doctorappbackend.user.model.dto.CreateUserRequest;
import com.daniel.doctorappbackend.user.model.dto.UserResponse;
import com.daniel.doctorappbackend.user.strategy.DoctorStrategy;
import com.daniel.doctorappbackend.user.strategy.PatientStrategy;
import com.daniel.doctorappbackend.user.strategy.UserStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class StrategyConfig {
    private final DoctorStrategy doctorStrategy;
    private final PatientStrategy patientStrategy;

    @Bean
    public Map<UserRole, UserStrategy<? extends UserResponse>> createConfig(){
        return new HashMap<UserRole, UserStrategy<? extends UserResponse>>() {{
            put(UserRole.DOCTOR, doctorStrategy);
            put(UserRole.PATIENT, patientStrategy);
        }};
    }
}


