package com.example.artauction.restImpl;

import com.example.artauction.rest.AdminRest;
import com.example.artauction.rest.UserRest;
import com.example.artauction.service.AdminService;
import com.example.artauction.utils.ArtAuctionUtils;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AdminRestImpl implements AdminRest {
    @Autowired
    AdminService adminService;

    @Override
    public ResponseEntity<String> highlightArtUser(Map<String, Integer> requestMap) {
        try{
            return adminService.highlight_artuser(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to highlight user", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> highlightAuction(Map<String, Integer> requestMap) {
        try{
            return adminService.highlight_auction(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to highlight auction", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> verifyAuction(Map<String, String> requestMap) {
        try{
            return adminService.verify_auction(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to verify auction", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
