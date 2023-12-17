package com.example.artauction.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.ExhibitionDTO;


@Repository
public class AdminRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // highlight if not highlighted, unhighlight if highlighted
    public ResponseEntity<String> highlight_artuser(int adminID, int artUserID) {
        try{
            String sql = "SELECT * FROM `artuser` WHERE `userID` = ? AND highlighter_adminID IS NULL";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, artUserID);
            if(!result.isEmpty()){
                String highlight = "UPDATE `artuser` SET `highlighter_adminID` = ? WHERE userID = ?";
                jdbcTemplate.update(highlight, adminID, artUserID);
                return new ResponseEntity<>("User " + artUserID + " is highlighted", HttpStatus.OK);
            }
            else{
                String highlight = "UPDATE `artuser` SET `highlighter_adminID` = NULL WHERE userID = ?";
                jdbcTemplate.update(highlight, artUserID);
                return new ResponseEntity<>("User " + artUserID + " is unhighlighted", HttpStatus.OK);
            }
        } catch(Exception e){
            return new ResponseEntity<>("Sth went wrong when highlighting", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // highlight if not highlighted, unhighlight if highlighted
    public ResponseEntity<String> highlight_auction(int adminID, int auctionID) {
        try{
            String sql = "SELECT * FROM `Auction` WHERE `auctionID` = ? AND highlighter_admin_ID IS NULL";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, auctionID);
            if(!result.isEmpty()){
                String highlight = "UPDATE `auction` SET `highlighter_admin_ID` = ? WHERE auctionID = ?";
                jdbcTemplate.update(highlight, adminID, auctionID);
                return new ResponseEntity<>("Auction " + auctionID + " is highlighted", HttpStatus.OK);
            }
            else{
                String highlight = "UPDATE `auction` SET `highlighter_admin_ID` = NULL WHERE auctionID = ?";
                jdbcTemplate.update(highlight, auctionID);
                return new ResponseEntity<>("Auction " + auctionID + " is unhighlighted", HttpStatus.OK);
            }
        } catch(Exception e){
            return new ResponseEntity<>("Sth went wrong when highlighting", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> verify_auction(int adminID, int auctionID, int isApproved) {
        try{
            String verify;
            if(isApproved == 0){
                verify = "UPDATE `auction` SET auction_status = \"rejected\", verifier_admin_ID = ? WHERE auctionID = ?";
            }
            else{
                verify = "UPDATE `auction` SET auction_status = \"approved\", verifier_admin_ID = ? WHERE auctionID = ?"; //bunu "ongoing"e mi çevirsek
            }
            jdbcTemplate.update(verify, adminID, auctionID);
            return new ResponseEntity<>("Auction " + auctionID + " is verified as: " + isApproved, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Sth went wrong when verifying", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> createExhibition(int adminID, String title, String description, int auctionId) {
        String sqlAddExh = "INSERT INTO `Exhibition` (creatorAdminID, exhibitionName, exhibitionDescriptor) VALUES (?, ?, ?)";
        jdbcTemplate.update(sqlAddExh, adminID, title, description);

        String sqlExhId = "SELECT LAST_INSERT_ID()";
        int exhibitionId = jdbcTemplate.queryForObject(sqlExhId, Integer.class);

        String sqlAddAuctionToExhibition = "INSERT INTO `Curate` (exhibitionID, auctionID) VALUES (?, ?)";
        jdbcTemplate.update(sqlAddAuctionToExhibition, exhibitionId, auctionId);
        return new ResponseEntity<>("Exhibition created and auction " + auctionId + " added", HttpStatus.OK);
    }

    // EXHIBITION SILININCE AUCTIONLAR SILINMESIN ELBETTE
    // silinmiyor, curate'tekiler gidiyor her sey süper
    public ResponseEntity<String> deleteExhibition(int exhibitionID) {
        String sqlDelExh = "DELETE FROM `Exhibition` WHERE exhibitionID = ?";
        jdbcTemplate.update(sqlDelExh, exhibitionID);
        return new ResponseEntity<>("Exhibiton deleted", HttpStatus.OK);
    }

    public ResponseEntity<String> addAuctionToExhibiton(int exhID, int auctionID) {
        String sqlAddAuctionToExhibition = "INSERT INTO `Curate` (exhibitionID, auctionID) VALUES (?, ?)";
        jdbcTemplate.update(sqlAddAuctionToExhibition, exhID, auctionID);
        return new ResponseEntity<>("Auction " + auctionID + " added to " + exhID, HttpStatus.OK);
    }

    public ResponseEntity<String> removeAuctionFromExhibition(int exhID, int auctionID) {
        String sqlDeleteAuctionFromExhibition = "DELETE FROM `Curate` WHERE exhibitionID = ? AND auctionID = ?";
        jdbcTemplate.update(sqlDeleteAuctionFromExhibition, exhID, auctionID);
        return new ResponseEntity<>("Auction " + auctionID + " removed from " + exhID, HttpStatus.OK);
    }

    public List<ExhibitionDTO> addAuctionMenu(int auctionID) {
        String sql = "SELECT e.exhibitionID, e.exhibitionName, e.exhibitionDescriptor, " +
        "CASE WHEN c.auctionID IS NOT NULL THEN true ELSE false END AS hasAuction " +
        "FROM exhibition e " +
        "LEFT JOIN curate c ON e.exhibitionID = c.exhibitionID AND c.auctionID = ?";

        List<ExhibitionDTO> exhibitionDTOList = jdbcTemplate.query(sql, new Object[]{auctionID}, (resultSet, i) -> {
        ExhibitionDTO exhibitionDTO = new ExhibitionDTO();
        exhibitionDTO.setExhibitionID(resultSet.getInt("exhibitionID"));
        exhibitionDTO.setExhibitionName(resultSet.getString("exhibitionName"));
        exhibitionDTO.setExhibitionDescriptor(resultSet.getString("exhibitionDescriptor"));
        boolean hasAuction = resultSet.getBoolean("hasAuction");
        exhibitionDTO.setHasTheAuctionAsked(hasAuction);
        return exhibitionDTO;
        });
        return exhibitionDTOList;
    }

    public ResponseEntity<String> updateExhibition(int exhibitionID, int adminID, String title, String description) {
        String sql = "UPDATE Exhibition " + 
                    "SET creatorAdminID = ?,  exhibitionName = ?, exhibitionDescriptor = ?" +
                    "WHERE exhibitionID = ?";
        jdbcTemplate.update(sql, adminID, title, description, exhibitionID);
        return new ResponseEntity<>("Exhibition " + exhibitionID + " updated", HttpStatus.OK);        
    }
}