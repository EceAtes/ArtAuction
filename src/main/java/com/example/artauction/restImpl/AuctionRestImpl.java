package com.example.artauction.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.rest.AuctionRest;
import com.example.artauction.service.AuctionService;
import com.example.artauction.utils.ArtAuctionUtils;
import com.example.artauction.wrapper.AuctionWrapper;

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

    @Override
    public ResponseEntity<List<AuctionWrapper>> getAuctionsFromPeopleYouFollow(Map<String, String> requestMap) {
        try{
            return auctionService.getAuctionsFromPeopleYouFollow(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<List<AuctionWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
