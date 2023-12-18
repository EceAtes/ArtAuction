package com.example.artauction.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class AuctionDTO {
    private Integer auctionID;
    private String title;
    private String auction_status = "proposed";; // proposed, ongoing,
    private Integer uploaded_by_artist_ID;
    private String type; // painting, sculpture,... dropdown olsa
    private String size;
    private LocalDate creationDate; //when the artwork is created
    private LocalDate uploadDate; //today
    private LocalDate startDate; // when admin verified
    private String description;
    private LocalDate endDate; // if passed, admin cannot verifies
    private boolean isEnded = false;
    private int minimumBidIncrease;
    private int baseBid;
    private Integer verifier_admin_ID;
    private Integer highlighter_admin_ID;
    private String artistName;

    public AuctionDTO(){
        auction_status = "proposed";
        uploadDate = LocalDate.now();
        isEnded = false;
        verifier_admin_ID = -1;
        highlighter_admin_ID = -1;
    }
}
