package com.example.artauction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
/*  
    @PostMapping(path = "/add_auction")
    public ResponseEntity<String> add_auction(@RequestBody(required = true) Map<String, String> requestMap){

    }

    @GetMapping(path = "/get")
    public ResponseEntity<List<AuctionWrapper>> getAllAuctions(){

    }

    @GetMapping(path = "/search")
    public ResponseEntity<List<AuctionWrapper>> searchAuctions(@RequestBody(required = true) Map<String, String> requestMap){

    }
*/
}