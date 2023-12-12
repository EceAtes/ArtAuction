package com.example.artauction.restImpl;

import com.example.artauction.rest.AuctionRest;
import com.example.artauction.service.AuctionService;
import com.example.artauction.service.UserService;
import com.example.artauction.utils.ArtAuctionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuctionRestImpl implements AuctionRest {
    @Autowired
    AuctionService auctionService;

    @Override
    public ResponseEntity<String> add_auction(Map<String, String> requestMap) {
        try{
            return auctionService.add_auction(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while adding the auction", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
