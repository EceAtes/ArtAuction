package com.example.artauction.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.dto.UserDTO;
import com.example.artauction.repository.ArtUserRepository;


@RestController
@RequestMapping("/art-user")
@CrossOrigin(origins = "http://localhost:3000")
public class ArtUserController {

    private ArtUserRepository artUserRepository;

    @Autowired
    public ArtUserController(ArtUserRepository artUserRepository){
        this.artUserRepository = artUserRepository;
    }

   @PatchMapping(path = "/follow")
    public ResponseEntity<HttpStatus> follow(@RequestBody(required = true) Map<String, Integer> requestMap){
        return artUserRepository.follow(requestMap.get("follower_id"), requestMap.get("following_id"));
    }

    @PatchMapping(path = "/unfollow")
    public ResponseEntity<HttpStatus> unfollow(@RequestBody(required = true) Map<String, Integer> requestMap){
        return artUserRepository.unfollow(requestMap.get("follower_id"), requestMap.get("following_id"));
    }

    @GetMapping(path = "/followers/{userID}")
    public List<UserDTO> listFollowers(@PathVariable String userID){
        return artUserRepository.listFollowers(Integer.parseInt(userID));
    }

    @GetMapping(path = "/auctions-from-people-you-follow")
    public List<AuctionDTO> listAuctionsFromYouFollow(@RequestBody(required = true) Map<String, Integer> requestMap){
        return artUserRepository.auctionsFromFollow(requestMap);
    }

    @GetMapping("/topCollectors")
    public List<Map<String,Object>> seeTopCollectors(){
        return artUserRepository.seeTopCollectors();
    }

    @GetMapping("/topArtists")
    public List<Map<String,Object>> seeTopArtists(){
        return artUserRepository.seeTopArtists();
    }

}
