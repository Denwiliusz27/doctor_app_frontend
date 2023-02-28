package com.daniel.doctorappbackend.medicalservice.advice;

import com.daniel.doctorappbackend.medicalservice.exception.MedicalServiceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MedicalServiceControllerAdvice {
    @ExceptionHandler(MedicalServiceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleServiceNotFoundException(MedicalServiceNotFoundException ex){
        return ex.getMessage();
    }
}
