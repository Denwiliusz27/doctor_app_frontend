package com.daniel.doctorappbackend.user.exception;

public class InvalidPasswordException extends Exception{
    public InvalidPasswordException() {
        super("invalid password");
    }
}
