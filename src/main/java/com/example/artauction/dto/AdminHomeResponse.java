package com.example.artauction.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminHomeResponse{

    List<AuctionDTO> auctions;
    List<UserDTO> artUsers;
    
}