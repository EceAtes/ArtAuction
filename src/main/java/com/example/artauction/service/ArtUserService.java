package com.example.artauction.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.artauction.POJO.ArtUser;
@Repository
public interface ArtUserService {
    ResponseEntity<String> follow(Map<String, Integer> requestMap);
    //ResponseEntity<List<ArtUser>> findFollowing(Map<String, Integer> requestMap);
    //ResponseEntity<List<ArtUser>> findFollowerUsers(Map<String, Integer> requestMap);
}
