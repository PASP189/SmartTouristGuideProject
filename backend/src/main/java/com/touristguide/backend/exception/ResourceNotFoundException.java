package com.touristguide.backend.exception;

/* basically  "error type" that we invented,
specifically for the situation of "someone asked for something that doesn't exist."*/

public class ResourceNotFoundException extends RuntimeException {

    // "extends RuntimeException" means this class inherits everything a normal exception can do,
    public ResourceNotFoundException(String message) {
        super(message);
    }
}