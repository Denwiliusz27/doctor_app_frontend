package com.daniel.doctorappbackend.user.model.dto;

import com.daniel.doctorappbackend.user.model.UserRole;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class UserResponse {
    private Long userId;
    private Long id;
    private String name;
    private String surname;
    private String email;
    private UserRole userRole;
}
