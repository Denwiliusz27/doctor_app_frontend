package com.daniel.doctorappbackend.medicalservice.exception;

public class MedicalServiceNotFoundException extends Exception{
    public MedicalServiceNotFoundException(Long id) {
        super(String.format("service not found: %d", id));
    }
}
