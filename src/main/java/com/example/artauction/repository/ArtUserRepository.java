package com.example.artauction.repository;

import java.util.ArrayList;
import java.util.List;

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
}