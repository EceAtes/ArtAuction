package com.example.artauction.controller;

import com.example.artauction.repository.CollectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collector")
@CrossOrigin(origins = "http://localhost:3000")
public class CollectorController {

    private CollectorRepository collectorRepository;

    @Autowired
    public CollectorController(CollectorRepository collectorRepository) {
        this.collectorRepository = collectorRepository;
    }

    @PostMapping("/bid")
    public ResponseEntity<HttpStatus> bid(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.bid(requestMap.get("collectorID"), requestMap.get("auctionID"), requestMap.get("bidAmount"));
    }

    @GetMapping("/bidHistory")
    public List<Map<String,Object>> seeBidHistory(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.seeBidHistory(requestMap.get("userID"), requestMap.get("auctionID"));
    }



}
