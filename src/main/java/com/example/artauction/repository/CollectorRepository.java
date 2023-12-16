package com.example.artauction.repository;
import jakarta.transaction.Transactional;
import org.springframework.jdbc.core.RowMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class CollectorRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CollectorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public ResponseEntity<HttpStatus> bid(Integer collectorID, Integer auctionID, Integer bidAmount) {
        String sqlNewBid = "INSERT INTO Bid (bidAmount, bid_status, date, approver_admin_ID, approver_artist_ID) VALUES (?,?,?,?,?)";
        String sqlNewOffer = "INSERT INTO Offer(auctionID, bidID, collectorID) VALUES(?,?,?);";
        String updateNewUserTokens = "UPDATE `artuser` SET tokens = tokens - ? WHERE userID = ?";
        if(checkPreviousBid(collectorID, auctionID, bidAmount)){
            try{
                jdbcTemplate.update(sqlNewBid,bidAmount, "Leading", LocalDate.now(), null, null);
                Integer bidID = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
                jdbcTemplate.update(sqlNewOffer, auctionID, bidID, collectorID);
                jdbcTemplate.update(updateNewUserTokens, bidAmount, collectorID);
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){
                e.printStackTrace();
                System.out.println("Bid creation failed");
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK); //not enough tokens etc
    }

    private boolean checkPreviousBid(Integer collectorID, Integer auctionID, Integer bidAmount) {
        String newBidUser = "SELECT tokens FROM artuser WHERE userId = ?";
        String sqlPreviousBid = "SELECT * " +
                "FROM `bid` b " +
                "NATURAL JOIN `offer` o " +
                "WHERE o.auctionID = ? AND b.bid_status = 'Leading'";
        String updatePreviousBid = "UPDATE `bid` SET bid_status = ? WHERE bidID = ?";
        String updatePreviousCollector = "UPDATE `artuser` SET tokens = tokens + ? WHERE userId = ?";
        try{
            Map<String, Object> newCollector = jdbcTemplate.queryForMap(newBidUser, collectorID);
            List<Map<String, Object>> previousBids = jdbcTemplate.queryForList(sqlPreviousBid, auctionID);

            if (Integer.parseInt(newCollector.get("tokens") + "") >= bidAmount){
                if (previousBids.isEmpty()){
                    return true; //first bid on the auction
                } else {
                    Map<String, Object> previousBid = previousBids.get(0);
                    if (bidAmount > Integer.parseInt(previousBid.get("bidAmount") + "")) {
                        jdbcTemplate.update(updatePreviousBid, "Outbid", Integer.parseInt(String.valueOf(previousBid.get("bidID"))));
                        jdbcTemplate.update(updatePreviousCollector, Integer.parseInt(String.valueOf(previousBid.get("bidAmount"))), Integer.parseInt(String.valueOf(previousBid.get("collectorID"))));
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }

        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Something went wrong in bid control");
            return false;
        }
    }
}
