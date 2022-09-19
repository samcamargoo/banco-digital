package com.sam.banco.exceptions;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CustomErrorHandler{

    @ResponseStatus(HttpStatus.BAD_REQUEST)  
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleContraintViolationException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF inválido");
    }
}