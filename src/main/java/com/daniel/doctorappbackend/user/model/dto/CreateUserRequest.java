package com.daniel.doctorappbackend.user.model.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    protected String name;
    protected String surname;
    protected String email;
    protected String password;
}
