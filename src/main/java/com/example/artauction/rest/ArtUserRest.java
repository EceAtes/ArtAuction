package com.example.artauction.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.artauction.POJO.ArtUser;

@RequestMapping(path = "/artuser")
public interface ArtUserRest {
    @PatchMapping(path = "/follow")
    public ResponseEntity<String> follow(@RequestBody(required = true) Map<String, Integer> requestMap);

    //@GetMapping(path = "/following")
    //public ResponseEntity<List<ArtUser>> findFollowing(@RequestBody(required = true) Map<String, Integer> requestMap);
}
