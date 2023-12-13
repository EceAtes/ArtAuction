package com.example.artauction.repository;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ResponseEntity<String> highlight_artuser(Map<String, Integer> requestMap) {
       return null;
    }

    public ResponseEntity<String> highlight_auction(Map<String, Integer> requestMap) {
        return null;
    }

    public ResponseEntity<String> verify_auction(Map<String, String> requestMap) {
        return null;
    }

  }
