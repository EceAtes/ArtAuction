package com.example.artauction.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.repository.AuctionRepository;

@RestController
@RequestMapping("/auction")
public class AuctionController {

    private AuctionRepository auctionRepository;

    @Autowired
    public AuctionController(AuctionRepository auctionRepository){
        this.auctionRepository = auctionRepository;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<HttpStatus> signUp(@RequestBody(required = true)AuctionDTO newAuction){
        return auctionRepository.createAuction(newAuction);
    }

    @GetMapping
    public List<Map<String, Object>> getAllAuctions(){
        return auctionRepository.getAllAuctions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionDTO> getSingleAuction(@PathVariable String id){
        return auctionRepository.getAuction(Integer.parseInt(id));
    }

/*
    @GetMapping(path = "/search")
    public ResponseEntity<List<AuctionWrapper>> searchAuctions(@RequestBody(required = true) Map<String, String> requestMap){

    }
*/
}