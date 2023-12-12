package com.example.artauction.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.rest.UserRest;
import com.example.artauction.service.UserService;
import com.example.artauction.utils.ArtAuctionUtils;
import com.example.artauction.wrapper.UserWrapper;

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
    
    @Override
    public ResponseEntity<Object> signIn(Map<String, String> requestMap) {
        try{
            return userService.signIn(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred in sign in attempt (Rest Impl)", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try {
            return userService.getAllUser();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<UserWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
