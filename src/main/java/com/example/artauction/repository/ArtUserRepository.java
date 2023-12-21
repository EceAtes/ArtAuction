package com.example.artauction.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.dto.SearchResponse;
import com.example.artauction.dto.UserDTO;

@Repository
public class ArtUserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ArtUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }  

    public ResponseEntity<HttpStatus> follow(int follower_id, int following_id){
        String sqlFollow = "INSERT INTO `follows` (followerID, followedID) VALUES (?, ?)";
        try {
            jdbcTemplate.update(sqlFollow, follower_id, following_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Something went wrong when following...");
            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> unfollow(int follower_id, int following_id){
        String sqlUnfollow = "DELETE FROM `follows` WHERE followerID = ? AND followedID = ?";
        try {
            jdbcTemplate.update(sqlUnfollow, follower_id, following_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Something went wrong when unfollowing...");
            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    public List<UserDTO> listFollowers(int userID){
        String sqlListFollower = "SELECT * FROM `user` JOIN `follows` ON `user`.userID = `follows`.followerID WHERE `follows`.followedID = ?";
        try {
            List<UserDTO> followers = jdbcTemplate.query(sqlListFollower, new Object[]{userID}, new BeanPropertyRowMapper<>(UserDTO.class));
            return followers;
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Something went wrong listing followers");
            return new ArrayList<UserDTO>();
        }
    }

    public List<AuctionDTO> auctionsFromFollow(Map<String, Integer> requestMap) {
        List<AuctionDTO> auctions;
        String sqlAuctionsFromFollow = "SELECT * FROM `auction` JOIN `follows` ON `auction`.uploaded_by_artist_ID = `follows`.followedID WHERE `follows`.followerID = ?";
        try{
            auctions = jdbcTemplate.query(sqlAuctionsFromFollow, new Object[]{requestMap.get("userID")}, new BeanPropertyRowMapper<>(AuctionDTO.class));
            return auctions;
        }catch (EmptyResultDataAccessException e) {
            System.out.println("Something went wrong listing the auctions of user's followers");
            return new ArrayList<AuctionDTO>();

        }
    }

//Top collectors are individuals with the highest number of successful auction wins.
    public List<Map<String, Object>> seeTopCollectors() {
        String sql = "SELECT C.userID, U.role, U.name, A.bio, COUNT(*) AS Wins " +
                "FROM `collector` C " +
                "JOIN `offer` O ON C.userID = O.collectorID " +
                "JOIN `bid` B ON O.bidID = B.bidID " +
                "JOIN `user` U ON U.userID = C.userID " +
                "JOIN `artuser` A ON A.userID = C.userID " +
                "WHERE B.bid_status = 'Won' " +
                "GROUP BY C.userID , U.role, U.name, A.bio " +
                "ORDER BY Wins DESC ";

        List<Map<String,Object>> collectors = jdbcTemplate.queryForList(sql);
        return collectors;
    }

//Top artists are those who have received the highest total number of bids across all their artworks or auctions
    public List<Map<String, Object>> seeTopArtists() {
        String sql = "SELECT A.userID, U.role, U.name, Art.bio, count(O.bidID) as TotalBids " +
                "FROM Artist A " +
                "NATURAL JOIN User U " +
                "NATURAL JOIN ArtUser Art " +
                "JOIN Auction Au ON Au.uploaded_by_artist_ID = A.userID " +
                "JOIN Offer O ON o.auctionID = Au.auctionID " +
                "GROUP BY A.userID, U.role, U.name, Art.bio " +
                "ORDER BY TotalBids DESC";

        List<Map<String,Object>> artists = jdbcTemplate.queryForList(sql);
        return artists;
    }

    public List<Map<String, Object>> filterPeople(String country, String userType) {
        String sql =
        "SELECT ArtUser.*, User.*" +
        "FROM ArtUser " +
        "JOIN User ON ArtUser.userID = User.userID " +
        "WHERE " +
        "(" +
        "    (ArtUser.country = ? AND EXISTS (SELECT 1 FROM ArtUser WHERE ArtUser.country = ?)) OR " +
        "    (? = 'Any') " +
        ") " +
        "AND " +
        "(" +
        "    (? = 'Artist' AND EXISTS (SELECT 1 FROM Artist WHERE Artist.userID = ArtUser.userID)) OR " +
        "    (? = 'Collector' AND EXISTS (SELECT 1 FROM Collector WHERE Collector.userID = ArtUser.userID)) OR " +
        "    (? = 'Any' AND (EXISTS (SELECT 1 FROM Artist WHERE Artist.userID = ArtUser.userID) OR EXISTS (SELECT 1 FROM Collector WHERE Collector.userID = ArtUser.userID))) " +
        ");";
        
        List<Map<String, Object>> filtered = jdbcTemplate.queryForList(sql, country, country, country, userType, userType, userType);
        return filtered;
    }

    public ResponseEntity<HttpStatus> editInfo(Map<String, String> requestMap) {
        String updateUser = "UPDATE artuser SET country = ?, bio = ? WHERE userID = ?";
        String updateName = "UPDATE user SET name = ? WHERE userID = ?";

        try{
            jdbcTemplate.update(updateUser, requestMap.get("country"), requestMap.get("bio"), requestMap.get("userID"));
            jdbcTemplate.update(updateName, requestMap.get("name"), requestMap.get("userID"));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Something went wrong in user info editing");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    public SearchResponse search(String searchKey) {
        SearchResponse results = new SearchResponse();
    
        String searchArtist = "SELECT u.userID, u.name " +
                              "FROM User u " +
                              "WHERE u.role = 'Artist' AND name LIKE ?";

        List<Map<String, Object>> matchingArtists = jdbcTemplate.queryForList(searchArtist, "%" + searchKey + "%");
        results.setArtists(matchingArtists);
    
        String searchCollector = "SELECT u.userID, u.name " +
                                 "FROM User u " + 
                                 "WHERE u.role = 'Collector' AND name LIKE ?";

        List<Map<String, Object>> matchingCollectors = jdbcTemplate.queryForList(searchCollector, "%" + searchKey + "%");
        results.setCollectors(matchingCollectors);
    
        String searchAuction = "SELECT a.*, u.name " +
                               "FROM Auction a " +
                               "JOIN User u ON u.userID = a.uploaded_by_artist_ID " +
                               "WHERE title LIKE ?";
        
        List<Map<String, Object>> matchingAuctions = jdbcTemplate.queryForList(searchAuction, "%" + searchKey + "%");
        results.setAuctions(matchingAuctions);
    
        String searchExhibition = "SELECT e.*, u.name " +
                                  "FROM Exhibition e " +
                                  "JOIN User u ON u.userID = e.creatorAdminID " + 
                                  "WHERE exhibitionName LIKE ?";
        
        List<Map<String, Object>> matchingExhibitions = jdbcTemplate.queryForList(searchExhibition, "%" + searchKey + "%");
        results.setExhibitions(matchingExhibitions);
    
        String searchCollection = "SELECT * " +
                                  "FROM Collection c " +
                                  "JOIN User u ON u.userID = c.creator_collectorID " + 
                                  "WHERE collection_name LIKE ?";
        
        List<Map<String, Object>> matchingCollections = jdbcTemplate.queryForList(searchCollection, "%" + searchKey + "%");
        results.setCollections(matchingCollections);
    
        return results;
    }
    
}