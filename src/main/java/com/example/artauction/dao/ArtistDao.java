package com.example.artauction.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.artauction.POJO.ArtUser;
import com.example.artauction.POJO.Artist;

public interface ArtistDao extends JpaRepository<ArtUser, Integer> {

    @Query(value = "SELECT a.* FROM artist a INNER JOIN artuser b ON a.user_id = b.user_id INNER JOIN user u ON b.user_id = u.user_id", nativeQuery = true)
    List<Artist> findArtistsWithUser();
    List<Artist> getAllArtists();
}
