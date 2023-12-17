package com.example.artauction.controller;

import com.example.artauction.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/artist")
@CrossOrigin(origins = "http://localhost:3000")
public class ArtistController {

    private ArtistRepository artistRepository;

    @Autowired
    public ArtistController(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @GetMapping("/artistInfo") //includes auction and account data
    public List<Map<String,Object>> getArtistInfo(@RequestBody(required = true) Map<String, Integer> requestMap){
        return artistRepository.getArtistInfo(requestMap.get("userID"));
    }
}
