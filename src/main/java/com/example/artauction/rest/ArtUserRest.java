package com.example.artauction.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/artuser")
public interface ArtUserRest {
    @PatchMapping(path = "/follow")
    public ResponseEntity<String> follow(@RequestBody(required = true) Map<String, Integer> requestMap);

}
