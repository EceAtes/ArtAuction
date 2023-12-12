package com.example.artauction.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ArtAuctionUtils {

    private ArtAuctionUtils(){

    }

    public static ResponseEntity<String> getResponseEntity(String message, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\": \""+ message + "\"}", httpStatus);
    }

}
