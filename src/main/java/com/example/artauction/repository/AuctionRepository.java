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
import org.springframework.scheduling.annotation.Scheduled;
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
    public List<Map<String, Object>> getAuction(int auctionID) {
        String sql = "SELECT A.*, U.name, (SELECT b.bidAmount FROM `Bid` b " +
                "JOIN `Offer` o ON o.bidID = b.bidID " +
                "WHERE o.auctionID = a.auctionID AND b.bid_status = ?) AS leadingBid, " +
                "(SELECT b.bidAmount FROM `Bid` b " +
                "JOIN `Offer` o ON o.bidID = b.bidID " +
                "WHERE o.auctionID = a.auctionID AND b.bid_status = ?) AS winnerBid  FROM `Auction` A JOIN `User` U ON A.uploaded_by_artist_ID = U.userID WHERE A.`auctionID` = ?";
        List<Map<String,Object>> auction = jdbcTemplate.queryForList(sql, "Leading", "Won", auctionID);
        return auction;
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
                "WHERE auction_status = 'ongoing' OR auction_status = 'approved' " +
                "ORDER BY uploadDate DESC";

        List<Map<String,Object>> auctions = jdbcTemplate.queryForList(sql);
        return auctions;
    }

    public List<Map<String, Object>> getPastAuctionsCollector(int userID) {
        String sql = "SELECT * FROM (`Auction` a NATURAL JOIN `Offer` o) NATURAL JOIN `Bid` b WHERE a.auction_status = ? AND o.collectorID = ? ORDER BY a.startDate, b.date DESC";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "closed", userID);
        return rows;
    }

    public List<Map<String, Object>> getOngoingAuctionsCollector(int userID) {
        String sql = "SELECT * FROM (`Auction` a NATURAL JOIN `Offer` o) NATURAL JOIN `Bid` b WHERE a.auction_status = ? AND o.collectorID = ? ORDER BY a.startDate, b.date DESC";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "ongoing", userID);
        return rows;
    }

    public List<Map<String, Object>> getSavedAuctionsCollector(int userID) {
        String sql = "SELECT a.* FROM `Auction` a NATURAL JOIN `Save` s WHERE s.collectorID = ? ";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, userID);
        return rows;
    }

    @Scheduled(cron = "*/5 * * * * *")  //Runs every 5 minutes //@Scheduled(cron = "0 0 0 * * *") // Runs daily at midnight
    public void updateAuctionStatus() {
        String sql = "UPDATE Auction " +
                "SET auction_status = CASE " +
                "WHEN EXISTS (SELECT 1 FROM Offer WHERE Offer.auctionID = Auction.auctionID) " +
                "    THEN 'ended' " +
                "    ELSE 'closed' " +
                "END, " +
                "isEnded = TRUE " +
                "WHERE endDate <= CURRENT_DATE AND isEnded = FALSE;";
        jdbcTemplate.update(sql);
    }

    public List<Map<String, Object>> getEndedAuctionSales() {
        String sql = "SELECT a.*, u.name, " +
                "(SELECT b.bidAmount FROM `Bid` b " +
                "JOIN `Offer` o ON o.bidID = b.bidID " +
                "WHERE o.auctionID = a.auctionID AND b.bid_status = ?) AS leadingBid " +
                "FROM `Auction` a " +
                "JOIN `User` u ON u.userID = a.uploaded_by_artist_ID " +
                "WHERE (a.auction_status = ? OR a.auction_status = ?) AND a.isEnded = ?";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "Leading", "ended", "artist_ok", true);
        return rows;
    }

    public List<Map<String, Object>> getEndedAuctionSales(int artistID) {
        String sql = "SELECT a.*, u.name, " +
                "(SELECT b.bidAmount FROM `Bid` b " +
                "JOIN `Offer` o ON o.bidID = b.bidID " +
                "WHERE o.auctionID = a.auctionID AND b.bid_status = ?) AS leadingBid " +
                "FROM `Auction` a " +
                "JOIN `User` u ON u.userID = a.uploaded_by_artist_ID " +
                "WHERE (a.auction_status = ? OR a.auction_status = ?) AND a.isEnded = ? AND a.uploaded_by_artist_ID = ?";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql,  "Leading", "ended", "admin_ok", true , artistID);
        return rows;

    }

    public List<Map<String, Object>> notApprovedAuctionsArtist(int userID) {
        String sql = "SELECT * FROM `Auction` a WHERE a.auction_status = ? AND a.uploaded_by_artist_ID = ? ORDER BY a.startDate DESC";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "proposed", userID);
        return rows;
    }

    public List<Map<String, Object>> getOngoingAuctionsArtist(int userID) {
        String sql = "SELECT * FROM `Auction` a WHERE a.auction_status = ? AND a.uploaded_by_artist_ID = ? ORDER BY a.startDate DESC";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "ongoing", userID);
        return rows;
    }

    public List<Map<String, Object>> soldAuctionsArtist(int userID) {
        String sql = "SELECT * FROM `Auction` a WHERE a.auction_status = ? AND a.uploaded_by_artist_ID = ? ORDER BY a.startDate DESC";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, "closed", userID);
        return rows;
    }
}


