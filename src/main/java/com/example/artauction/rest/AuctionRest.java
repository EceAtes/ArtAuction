package com.example.artauction.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/auction")
public interface AuctionRest {

    @PostMapping(path = "/add_auction")
    public ResponseEntity<String> add_auction(@RequestBody(required = true) Map<String, String> requestMap);
}
