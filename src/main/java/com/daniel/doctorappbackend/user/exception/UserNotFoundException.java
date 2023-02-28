package com.daniel.doctorappbackend.user.exception;

public class UserNotFoundException extends Exception{
    public UserNotFoundException() {
        super("user not found");
    }
}
