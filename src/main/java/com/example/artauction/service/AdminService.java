package com.example.artauction.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AdminService {

    ResponseEntity<String> highlight_artuser(Map<String, Integer> requestMap);
}
