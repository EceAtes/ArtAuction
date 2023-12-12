package com.example.artauction.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/admin")
public interface AdminRest {
    @PatchMapping(path= "/highlight_user")
    public ResponseEntity<String> highlightArtUser(@RequestBody(required = true) Map<String, Integer> requestMap);

    @PatchMapping(path= "/highlight_auction")
    public ResponseEntity<String> highlightAuction(@RequestBody(required = true) Map<String, Integer> requestMap);

    @PatchMapping(path= "/verify_auction")
    public ResponseEntity<String> verifyAuction(@RequestBody(required = true) Map<String, String> requestMap);

}
