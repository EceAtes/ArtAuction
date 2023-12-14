package com.example.artauction.repository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.AuctionDTO;

@Repository
public class AuctionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AuctionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ResponseEntity<HttpStatus> createAuction(AuctionDTO newAuction) {
        String sqlAddAuction = "INSERT INTO `auction` (title, auction_status, uploaded_by_artist_ID, type, size, creationDate, uploadDate,"
                                                 + "startDate, description, endDate, isEnded, minimumBidIncrease, baseBid, verifier_admin_ID, highlighter_admin_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(sqlAddAuction, newAuction.getTitle(), "proposed", newAuction.getUploaded_by_artist_ID(), newAuction.getType(),
                                newAuction.getSize(), newAuction.getCreationDate(), LocalDate.now(), newAuction.getStartDate(), newAuction.getDescription(), newAuction.getEndDate(),
                                newAuction.isEnded(), newAuction.getBaseBid(), newAuction.getMinimumBidIncrease(), null, null);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Auction creation failed");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    public List<AuctionDTO> getAllAuctions() {
        return null;
    }
    */

}
