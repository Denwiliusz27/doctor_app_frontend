package com.daniel.doctorappbackend.city.advice;

import com.daniel.doctorappbackend.city.exception.CityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CityControllerAdvice {
    @ExceptionHandler(CityNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleCityNotFound(CityNotFoundException ex){
        return ex.getMessage();
    }
}
