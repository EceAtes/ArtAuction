package com.example.artauction.restImpl;

import com.example.artauction.rest.UserRest;
import com.example.artauction.service.UserService;
import com.example.artauction.utils.ArtAuctionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            return userService.signUp(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred in sign up attempt (Rest Impl)", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
