package com.daniel.doctorappbackend.specialization.advice;

import com.daniel.doctorappbackend.specialization.exception.SpecializationNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SpecializationControllerAdvice {
    @ExceptionHandler(SpecializationNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleSpecializationNotFound(SpecializationNotFoundException ex) {
        return ex.getMessage();
    }
}
