package com.example.artauction.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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
                                newAuction.getSize(), newAuction.getCreationDate(), LocalDate.now(), null, newAuction.getDescription(), newAuction.getEndDate(),
                                0, newAuction.getMinimumBidIncrease(), newAuction.getBaseBid(), null, null);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Auction creation failed");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // silinince exhibitiondan da silindi, ok
    public ResponseEntity<String> deleteAuction(int auctionID){
        //if waiting verification
        String sql = "DELETE FROM `auction` WHERE auctionID = ?";
        jdbcTemplate.update(sql, auctionID);
        return new ResponseEntity<>("Auction " + auctionID + " deleted", HttpStatus.OK);        
    }

    public List<Map<String, Object>> getAllAuctions() {
        String sql = "SELECT * FROM `Auction`";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        return rows;
    }

    //ongoingde leading bidi ve ended'de winning bid'İ de burdan göndermeliyiz bence ama auctionDTP nasıl olur o zaman bilemedim :/
    public ResponseEntity<AuctionDTO> getAuction(int auctionID) {
        String sql = "SELECT * FROM `Auction` WHERE `auctionID` = ?";
        RowMapper<AuctionDTO> rowMapper = (rs, rowNum) -> {
            AuctionDTO auction = new AuctionDTO();
            auction.setAuctionID(auctionID);
            auction.setTitle(rs.getString("title"));
            auction.setAuction_status(rs.getString("auction_status"));
            auction.setUploaded_by_artist_ID(rs.getInt("uploaded_by_artist_ID"));
            String artistSql = "SELECT name FROM `User` WHERE `userID` = ?";
            String artistName = jdbcTemplate.queryForObject(artistSql, new Object[]{auction.getUploaded_by_artist_ID()}, String.class);
            auction.setArtistName(artistName);
            auction.setType(rs.getString("type"));
            auction.setSize(rs.getString("size"));
            auction.setCreationDate(LocalDate.parse(rs.getString("creationDate")));
            auction.setUploadDate(LocalDate.parse(rs.getString("uploadDate")));
            auction.setStartDate(LocalDate.parse(rs.getString("startDate")));
            auction.setDescription(rs.getString("description"));
            auction.setEndDate(LocalDate.parse(rs.getString("uploadDate")));
            auction.setEnded(rs.getBoolean("isEnded"));
            auction.setBaseBid(rs.getInt("baseBid"));
            auction.setMinimumBidIncrease(rs.getInt("minimumBidIncrease"));

            auction.setVerifier_admin_ID(rs.getObject("verifier_admin_ID") != null ? rs.getInt("verifier_admin_ID") : -1);
            auction.setHighlighter_admin_ID(rs.getObject("highlighter_admin_id") != null ? rs.getInt("highlighter_admin_id") : -1);          

            return auction;
        };

        try {
            
            return new ResponseEntity<AuctionDTO>(jdbcTemplate.queryForObject(sql, new Object[]{auctionID}, rowMapper), HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No such auction exists");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public List<Map<String, Object>> listHighlightedAuctions() {
        String sql = "SELECT * FROM `Auction` WHERE highlighter_admin_ID IS NOT NULL";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        return rows;
    }

    // end date geçmişse verifylayamaz, auction proposed'ta kalır
    public List<Map<String, Object>> listProposedAuctions() {
        String sql = "SELECT auction.*, user.userID, user.name " +
                     "FROM auction " +
                     "JOIN user ON user.userID = auction.uploaded_by_artist_ID " + 
                     "WHERE auction.auction_status = 'proposed' AND auction.endDate > CURRENT_DATE ";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        return rows;
    }

    public ResponseEntity<String> updateAuction(AuctionDTO updatedAuction) {
        //if waiting verification
        String sql = "UPDATE Auction " + 
                "SET title = ?,  type = ?, size = ?, creationDate = ?, uploadDate = ?, startDate = ?, description = ?, endDate = ?, minimumBidIncrease = ?, baseBid = ? " +
                "WHERE auctionID = ?";
        jdbcTemplate.update(sql, updatedAuction.getTitle(), updatedAuction.getType(), updatedAuction.getSize(), updatedAuction.getCreationDate(),
                            LocalDate.now(), updatedAuction.getStartDate(), updatedAuction.getDescription(), updatedAuction.getEndDate(),
                            updatedAuction.getMinimumBidIncrease(), updatedAuction.getBaseBid(), updatedAuction.getAuctionID());
        return new ResponseEntity<>("Auction " + updatedAuction.getAuctionID() + " updated", HttpStatus.OK);        
    }

    public List<Map<String,Object>> getPopularAuctions(){
        String sql = "SELECT A.auctionID, A.title, COUNT(B.bidID) AS NumberOfBids " +
                "FROM `auction` a " +
                "JOIN `offer` O On O.auctionID = A.auctionID " +
                "JOIN `bid` B ON B.bidID = O.bidID " +
                "GROUP BY A.auctionID, A.title " +
                "ORDER BY NumberOfBids DESC ";
        List<Map<String,Object>> bids = jdbcTemplate.queryForList(sql);
        return bids;
    }

    public List<Map<String,Object>> getAllBidHistory(Map<String, Integer> requestMap) {
        String sql = "SELECT * FROM `bid` b " +
                "JOIN `offer` o ON o.bidID = b.bidID " +
                "JOIN `collector` c ON o.collectorID = c.UserID " +
                "JOIN `user` u ON c.UserID = u.UserID " +
                "JOIN `auction` a ON o.auctionID = a.auctionID " +
                "WHERE a.auctionID = ? " +
                "ORDER BY b.bidID DESC"; //leading hep birinci sırada

        List<Map<String,Object>> bids = jdbcTemplate.queryForList(sql, requestMap.get("auctionID"));
        return bids;
    }

    public List<Map<String, Object>> getRecentAuctions() {
        String sql = "SELECT * " +
                "FROM `auction` a " +
                "WHERE auction_status = 'approved' " + //maybe "ongoing"
                "ORDER BY uploadDate DESC ";

        List<Map<String,Object>> auctions = jdbcTemplate.queryForList(sql);
        return auctions;
    }
}


