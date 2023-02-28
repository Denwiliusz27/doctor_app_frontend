package com.daniel.doctorappbackend.doctorServices.advice;

import com.daniel.doctorappbackend.doctorServices.exception.DoctorServiceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class DoctorServiceControllerAdvice {
    @ExceptionHandler(DoctorServiceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleDoctorServiceNotFoundException(DoctorServiceNotFoundException ex){
        return ex.getMessage();
    }
}
