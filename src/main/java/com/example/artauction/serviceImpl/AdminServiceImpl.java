package com.example.artauction.serviceImpl;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
/*
@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    UserDao userDao;

    @Autowired
    AuctionDao auctionDao;

    @Override
    @Transactional
    public ResponseEntity<String> highlight_artuser(Map<String, Integer> requestMap) {
        log.info("Inside highlight_artuser {}", requestMap);
        ArtUser highlighted_user;
        Admin admin;
        Object user;

        try{
            user = userDao.getReferenceById(requestMap.get("highlighted_user_id"));
            if (user instanceof HibernateProxy) {
                highlighted_user = (ArtUser) Hibernate.unproxy(user);
            } else {
                highlighted_user = (ArtUser) user;
            }
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("highlighted user doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user = userDao.getReferenceById(requestMap.get("admin_id"));
        if (user instanceof HibernateProxy) {
            admin = (Admin) Hibernate.unproxy(user);
        } else {
            admin = (Admin) user;
        }
        admin.getHighlightedUsers().add(highlighted_user);
        highlighted_user.setHighlighterAdmin(admin);
        return new ResponseEntity<>(highlighted_user.getName() + " successfully highlighted", HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<String> highlight_auction(Map<String, Integer> requestMap) {
        log.info("Inside highlight_auction {}", requestMap);
        Auction highlighted_auction;
        Admin admin;
        Object user;

        try {
            highlighted_auction = auctionDao.getReferenceById(requestMap.get("highlighted_auction_id"));
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("highlighted auction doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user = userDao.getReferenceById(requestMap.get("admin_id"));
        if (user instanceof HibernateProxy) {
            admin = (Admin) Hibernate.unproxy(user);
        } else {
            admin = (Admin) user;
        }
        admin.getHighlightedAuctions().add(highlighted_auction);
        highlighted_auction.setHighlighter_admin(admin);
        return new ResponseEntity<>(highlighted_auction.getTitle() + " successfully highlighted", HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<String> verify_auction(Map<String, String> requestMap) {
        log.info("Inside verify_auction {}", requestMap);
        Auction verified_auction;
        Admin admin;
        Object user;

        try {
            verified_auction = auctionDao.getReferenceById(Integer.parseInt(requestMap.get("verified_auction_id")));
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("verified auction doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(!(verified_auction.getAuction_status().equals("Proposed"))){
            System.out.println(verified_auction.getAuction_status());
            if(verified_auction.getAuction_status().equals("Rejected")){
                return new ResponseEntity<>("auction has already been rejected before", HttpStatus.CONFLICT );
            }
            return new ResponseEntity<>("auction has already been verified", HttpStatus.OK);
        }

        user = userDao.getReferenceById(Integer.parseInt(requestMap.get("admin_id")));
        if (user instanceof HibernateProxy) {
            admin = (Admin) Hibernate.unproxy(user);
        } else {
            admin = (Admin) user;
        }

        if(requestMap.get("verification_choice").equals("verify")){  //verify
            admin.getVerifiedAuctions().add(verified_auction);
            verified_auction.setVerifier_admin(admin);
            System.out.println(verified_auction.getVerifier_admin());
            System.out.println(verified_auction.getVerifier_admin());
            return new ResponseEntity<>(verified_auction.getTitle() + " successfully verified", HttpStatus.OK);
        }
        else if (requestMap.get("verification_choice").equals("reject")){  //reject
            verified_auction.setAuction_status("Rejected");
            verified_auction.setVerifier_admin(admin); //technically rejecting admin, but I think no need for another variable
            return new ResponseEntity<>(verified_auction.getTitle() + " successfully rejected", HttpStatus.OK);
        }
        return new ResponseEntity<>("Action on auction cannot be interpreted", HttpStatus.BAD_REQUEST);

    }
}
*/