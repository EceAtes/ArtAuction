package com.example.artauction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ArtAuctionApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArtAuctionApplication.class, args);
    }

}