package com.example.artauction.dto;

import jakarta.persistence.criteria.CriteriaBuilder;

import java.time.LocalDate;

public class BidDTO {

    private Integer bidID;
    private int bidAmount;
    private String bid_status;
    private LocalDate date;
    private Integer approver_admin_ID;
    private Integer approver_artist_ID;

}
