package com.example.artauction.controller;

import java.awt.*;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.artauction.dto.ExhibitionDTO;
import com.example.artauction.dto.UserDTO;
import com.example.artauction.repository.UserRepository;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    
    @GetMapping(path = "/users")
    public List<Map<String, Object>> getAllUsers(){
        return userRepository.getAllUsers();
    }

    @GetMapping(path = "/users/{userID}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String userID){
        return userRepository.getSingleUser(Integer.parseInt(userID));
    }

    @GetMapping(path = "/art-users")
    public List<UserDTO> getAllArtUsers(){
        return userRepository.getAllArtUsers();
    }

    @GetMapping(path = "/art-users/{userID}")
    public ResponseEntity<UserDTO> getArtUser(@PathVariable String userID){
        return userRepository.getSingleArtUser(Integer.parseInt(userID));
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<Integer> signUp(@RequestBody(required = true)UserDTO newUser){
        return userRepository.registerArtUser(newUser);
    }

    @PostMapping(path = "/signin")
    public ResponseEntity<UserDTO> signIn(@RequestBody(required = true)Map<String,String> input){
        return userRepository.login(input.get("email"), input.get("password"));
    }

    @PatchMapping(path = "/verifySale")
    public ResponseEntity<HttpStatus> verifySale(@RequestBody(required = true)Map<String,String> input){
        return userRepository.verifySale(input);
    }



}