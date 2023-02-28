package com.daniel.doctorappbackend.city.exception;

public class CityNotFoundException extends Exception{
    public CityNotFoundException(Long id){
        super(String.format("city not found: %d", id));
    }
}
