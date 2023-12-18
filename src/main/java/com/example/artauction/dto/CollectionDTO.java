package com.example.artauction.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollectionDTO {
    private Integer collectionID;
    private String collectionName;
    private List<AuctionDTO> auctions = new ArrayList<>(); //auction ids with titles
    private boolean hasTheAuctionAsked;
}
