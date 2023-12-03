package com.example.artauction.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/admin")
public interface AdminRest {
    @PatchMapping(path= "/highlight")
    public ResponseEntity<String> highlight(@RequestBody(required = true) Map<String, Integer> requestMap);

}
