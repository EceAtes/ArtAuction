package com.example.artauction.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.artauction.wrapper.AuctionWrapper;

@RequestMapping(path = "/auction")
public interface AuctionRest {

    @PostMapping(path = "/add_auction")
    public ResponseEntity<String> add_auction(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/followed-artists-auctions")
    public ResponseEntity<List<AuctionWrapper>> getAuctionsFromPeopleYouFollow(Map<String, String> requestMap);

}
