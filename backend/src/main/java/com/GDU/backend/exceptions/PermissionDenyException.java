package com.GDU.backend.exceptions;

public class PermissionDenyException extends Exception {

    public PermissionDenyException(String message) {
        super(message);
    }
}