package com.example.artauction.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.POJO.ArtUser;
import com.example.artauction.rest.ArtUserRest;
import com.example.artauction.service.ArtUserService;
import com.example.artauction.utils.ArtAuctionUtils;

@RestController
public class ArtUserRestImpl implements ArtUserRest {

    @Autowired
    ArtUserService artUserService;

    @Override
    public ResponseEntity<String> follow(Map<String, Integer> requestMap) {
        try{
            return artUserService.follow(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to follow", HttpStatus.INTERNAL_SERVER_ERROR);
    }

   /*@Override
    public ResponseEntity<List<ArtUser>> findFollowing(Map<String, Integer> requestMap) {
        try{
            return artUserService.findFollowing(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<ArtUser>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
}
