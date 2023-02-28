package com.daniel.doctorappbackend.user.advice;

import com.daniel.doctorappbackend.user.exception.InvalidPasswordException;
import com.daniel.doctorappbackend.user.exception.UserErrorResponse;
import com.daniel.doctorappbackend.user.exception.UserExistException;
import com.daniel.doctorappbackend.user.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserControllerAdvice {
    @ExceptionHandler({UserNotFoundException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public UserErrorResponse handleUserNotFound(UserNotFoundException userNotFoundException){
        return UserErrorResponse.EMAIL_NOT_EXIST;
    }

    @ExceptionHandler({InvalidPasswordException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public UserErrorResponse handleInvalidPasswordException(InvalidPasswordException invalidPasswordException){
        return UserErrorResponse.INVALID_PASSWORD;
    }

    @ExceptionHandler({UserExistException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public UserErrorResponse handleUserExistException(UserExistException userExistException){
        return UserErrorResponse.USER_EXIST;
    }
}
