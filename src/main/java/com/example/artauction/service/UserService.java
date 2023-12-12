package com.example.artauction.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.artauction.wrapper.UserWrapper;

public interface UserService {

    ResponseEntity<String> signUp(Map<String, String> requestMap);

    ResponseEntity<Object> signIn(Map<String, String> requestMap);

    ResponseEntity<List<UserWrapper>> getAllUser();



}
