package com.example.artauction.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface AuctionService {

    ResponseEntity<String> add_auction(Map<String, String> requestMap);
}


