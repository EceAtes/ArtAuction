package com.example.artauction.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.artauction.POJO.Auction;
import com.example.artauction.wrapper.AuctionWrapper;

public interface AuctionDao extends JpaRepository<Auction, Integer> {

    List<AuctionWrapper> getAuctionsFromPeopleYouFollow(@Param("user_id")String user_id);


}
