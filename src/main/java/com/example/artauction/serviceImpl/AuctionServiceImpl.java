package com.example.artauction.serviceImpl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.artauction.POJO.Artist;
import com.example.artauction.POJO.Auction;
import com.example.artauction.dao.AuctionDao;
import com.example.artauction.dao.UserDao;
import com.example.artauction.service.AuctionService;
import com.example.artauction.utils.ArtAuctionUtils;
import com.example.artauction.wrapper.AuctionWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    AuctionDao auctionDao;

    @Autowired
    UserDao userDao;

    @Override
    public ResponseEntity<String> add_auction(Map<String, String> requestMap) {
        log.info("Inside add_auction {}", requestMap);
        try {
            if (validateAddition(requestMap)) {
                try{
                    auctionDao.save(getAuctionFromRequest(requestMap));
                }catch (ParseException pe){
                    pe.printStackTrace();
                    return ArtAuctionUtils.getResponseEntity("At least one of the dates is not in the right format (yyyy-MM-dd) ", HttpStatus.BAD_REQUEST);
                }
                catch (Exception e){
                    e.printStackTrace();
                    return ArtAuctionUtils.getResponseEntity("Error occurred while creating a new auction", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return ArtAuctionUtils.getResponseEntity("Auction is successfully created", HttpStatus.OK);
            } else {
                return ArtAuctionUtils.getResponseEntity("Invalid auction data", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("Some error occurred in auction addition (Service Impl)", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<AuctionWrapper>> getAuctionsFromPeopleYouFollow(Map<String, String> requestMap) {
        try {
            return new ResponseEntity<>(auctionDao.getAuctionsFromPeopleYouFollow(requestMap.get("user_id")), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateAddition(Map<String, String> requestMap){
        if(requestMap.containsKey("title") && requestMap.containsKey("uploaded_by_artist") && requestMap.containsKey("type")
                && requestMap.containsKey("size") && requestMap.containsKey("creationDate") && requestMap.containsKey("description")
                && requestMap.containsKey("endDate") && requestMap.containsKey("minimumBidIncrease") && requestMap.containsKey("baseBid")){
            return true;
        }
        return false;
    }

    private Auction getAuctionFromRequest(Map<String, String> requestMap) throws ParseException{
        Auction auction = new Auction();
        Object user;
        Artist artist;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        System.out.println("ENTERED getAuctionFromRequest");

        user = userDao.getReferenceById(Integer.parseInt(requestMap.get("uploaded_by_artist")));
        if (user instanceof HibernateProxy) {
            artist = (Artist) Hibernate.unproxy(user);
        } else {
            artist = (Artist) user;
        }
        auction.setUploaded_by_artist(artist);

        auction.setTitle(requestMap.get("title"));
        auction.setType(requestMap.get("type"));
        auction.setSize(requestMap.get("size"));

        auction.setCreationDate(new Date(dateFormat.parse(requestMap.get("creationDate")).getTime()));
        auction.setEndDate(new Date(dateFormat.parse(requestMap.get("endDate")).getTime()));

        auction.setDescription(requestMap.get("description"));
        auction.setMinBidIncrease(Integer.parseInt(requestMap.get("minimumBidIncrease")));
        auction.setBaseBid(Integer.parseInt(requestMap.get("baseBid")));

        return auction;
    }
}
