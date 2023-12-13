package com.example.artauction.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.artauction.wrapper.AuctionWrapper;

@Repository
public interface AuctionService {

    ResponseEntity<String> add_auction(Map<String, String> requestMap);
    ResponseEntity<List<AuctionWrapper>> getAuctionsFromPeopleYouFollow(Map<String, String> requestMap);
}


