package com.daniel.doctorappbackend.user.exception;

public class UserExistException extends Exception{
    public UserExistException() {
        super("user exist");
    }
}
