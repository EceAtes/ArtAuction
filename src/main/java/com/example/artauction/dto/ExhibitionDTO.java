package com.example.artauction.dto;

import java.util.ArrayList;
import java.util.List;

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
    private List<Integer> auctions = new ArrayList<>();
    private boolean hasTheAuctionAsked;
}
