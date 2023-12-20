package com.example.artauction.controller;

import com.example.artauction.repository.ArtistRepository;
import com.example.artauction.repository.AuctionRepository;
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
    private AuctionRepository auctionRepository;

    @Autowired
    public ArtistController(ArtistRepository artistRepository,AuctionRepository auctionRepository) {
        this.artistRepository = artistRepository;
        this.auctionRepository = auctionRepository;
    }

    @PatchMapping("/artistInfo") //includes auction and account data
    public List<Map<String,Object>> getArtistInfo(@RequestBody(required = true) Map<String, Integer> requestMap){
        return artistRepository.getArtistInfo(requestMap.get("userID"));
    }

    @GetMapping(path = "/getEndedAuctions/{userID}")
    public List<Map<String, Object>> getEndedAuctions(@PathVariable String userID){
        try{
            return auctionRepository.getEndedAuctionSales(Integer.parseInt(userID));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path = "notApprovedAuctions/{userID}")
    public List<Map<String, Object>> notApprovedAuctionsArtist(@PathVariable String userID) {
        return auctionRepository.notApprovedAuctionsArtist(Integer.parseInt(userID));
    }

    @GetMapping(path = "ongoingAuctions/{userID}")
    public List<Map<String, Object>> getOngoingAuctionsArtist(@PathVariable String userID) {
        return auctionRepository.getOngoingAuctionsArtist(Integer.parseInt(userID));
    }

    @GetMapping(path = "pastAuctions/{userID}")
    public List<Map<String, Object>> soldAuctionsArtist(@PathVariable String userID) {
        return auctionRepository.soldAuctionsArtist(Integer.parseInt(userID));
    }
}
