package com.example.artauction.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.artauction.dto.AuctionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

    public List<UserDTO> getAllArtUsers() {
        return null;
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

    public List<Map<String, Object>> seeTopCollectors() {
        String sql = "SELECT C.userID, U.role, U.name, A.bio, COUNT(*) AS Wins " +
                "FROM `collector` C " +
                "JOIN `offer` O ON C.userID = O.collectorID " +
                "JOIN `bid` B ON O.bidID = B.bidID " +
                "JOIN `user` U ON U.userID = C.userID " +
                "JOIN `artuser` A ON A.userID = C.userID " +
                "WHERE B.bid_status = 'Leading' " + //"won" olması lazım ama test için değiştirdim
                "GROUP BY C.userID , U.role, U.name, A.bio " +
                "ORDER BY Wins DESC ";

        List<Map<String,Object>> collectors = jdbcTemplate.queryForList(sql);
        return collectors;
    }

    //bitmişleri sayması lazım ama status isimlerini bi tam olarak belirleyelim
    public List<Map<String, Object>> seeTopArtists() {
        String sql = "SELECT A.userID, U.role, U.name, Art.bio, Count(*) as compAucCount " +
                "FROM Artist A " +
                "NATURAL JOIN User U " +
                "NATURAL JOIN ArtUser Art " +
                "JOIN Auction Auc ON Auc.uploaded_by_artist_ID = A.userID " +
                //"WHERE Auc.isEnded = TRUE " +
                "GROUP BY A.userID, U.role, U.name, Art.bio " +
                "ORDER BY compAucCount DESC";

        List<Map<String,Object>> artists = jdbcTemplate.queryForList(sql);
        return artists;
    }
}