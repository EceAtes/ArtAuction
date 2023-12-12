package com.example.artauction.dao;

import com.example.artauction.POJO.Auction;
import com.example.artauction.wrapper.AuctionWrapper;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionDao extends JpaRepository<Auction, Integer> {

    List<AuctionWrapper> getAllAuctions();

    @Query("SELECT NEW com.example.artauction.wrapper.AuctionWrapper(a.auctionID, a.title, a.auction_status) " +
            "FROM Auction a " +
            "WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :searchedWords, '%')) " +
            "OR LOWER(a.description) LIKE LOWER(CONCAT('%', :searchedWords, '%')) " +
            "ORDER BY a.auctionID")
    List<AuctionWrapper> searchAuctions(@Param("searchedWords") String searchedWords);
}
