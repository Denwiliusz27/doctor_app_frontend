package com.daniel.doctorappbackend.specialization.exception;

public class SpecializationNotFoundException extends Exception{
    public SpecializationNotFoundException(Long id) {
        super(String.format("specialization not found: %d", id));
    }
}
