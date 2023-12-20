package com.example.artauction.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ArtistRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ArtistRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getArtistInfo(Integer userID) {
        String sql = "SELECT u.*, Aus.*, Au.* " +
                "FROM Artist Ar " +
                "JOIN ArtUser Aus ON Aus.userID = Ar.userID " +
                "JOIN Auction Au ON Au.uploaded_by_artist_ID = Ar.userID " +
                "JOIN `User` u ON u.userID = Ar.userID " +
                "WHERE Ar.userID = ?";
        List<Map<String,Object>> info = jdbcTemplate.queryForList(sql, userID);
        return info;
    }

}
