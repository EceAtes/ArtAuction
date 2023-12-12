package com.example.artauction.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AdminService {

    ResponseEntity<String> highlight_artuser(Map<String, Integer> requestMap);

    ResponseEntity<String> highlight_auction(Map<String, Integer> requestMap);

    ResponseEntity<String> verify_auction(Map<String, String> requestMap);

}
