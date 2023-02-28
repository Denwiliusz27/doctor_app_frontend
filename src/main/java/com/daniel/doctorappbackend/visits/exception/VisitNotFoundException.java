package com.daniel.doctorappbackend.visits.exception;

public class VisitNotFoundException extends Exception{
    public VisitNotFoundException(Long id){
        super(String.format("visitNotFound: %d", id));
    }
}
