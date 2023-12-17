package com.example.artauction.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionDTO {
    private Integer exhibitionID;
    private String exhibitionName;
    private String exhibitionDescriptor;
    private List<AuctionDTO> auctions = new ArrayList<>(); //auction ids with titles
    private boolean hasTheAuctionAsked;
}
