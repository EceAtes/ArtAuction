package com.example.artauction.dao;

import com.example.artauction.POJO.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionDao extends JpaRepository<Auction, Integer> {
}
