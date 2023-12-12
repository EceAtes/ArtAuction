package com.example.artauction.service;

import com.example.artauction.wrapper.AuctionWrapper;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AuctionService {

    ResponseEntity<String> add_auction(Map<String, String> requestMap);

    ResponseEntity<List<AuctionWrapper>> getAllAuctions();

    ResponseEntity<List<AuctionWrapper>> searchAuctions(String searchedWords);
}


