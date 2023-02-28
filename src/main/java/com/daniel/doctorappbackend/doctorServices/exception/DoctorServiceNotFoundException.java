package com.daniel.doctorappbackend.doctorServices.exception;

public class DoctorServiceNotFoundException extends Exception{
    public DoctorServiceNotFoundException(Long id){
        super(String.format("Doctor service not found: %d", id));
    }
}
