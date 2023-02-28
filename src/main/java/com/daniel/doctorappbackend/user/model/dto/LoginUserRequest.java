package com.daniel.doctorappbackend.user.model.dto;

import com.daniel.doctorappbackend.user.model.UserRole;
import lombok.Data;

@Data
public class LoginUserRequest {
    private String email;
    private String password;
    private UserRole role;
}
