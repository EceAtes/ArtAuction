package com.example.artauction.rest;

import com.example.artauction.wrapper.AuctionWrapper;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/auction")
public interface AuctionRest {

    @PostMapping(path = "/add_auction")
    public ResponseEntity<String> add_auction(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<AuctionWrapper>> getAllAuctions();

    @GetMapping(path = "/search")
    public ResponseEntity<List<AuctionWrapper>> searchAuctions(@RequestBody(required = true) Map<String, String> requestMap);
}
