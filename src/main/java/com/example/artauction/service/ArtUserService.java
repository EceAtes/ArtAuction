package com.example.artauction.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ArtUserService {
    ResponseEntity<String> follow(Map<String, Integer> requestMap);

}
