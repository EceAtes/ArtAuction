package com.example.artauction.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface ArtUserService {
    ResponseEntity<String> follow(Map<String, Integer> requestMap);

}