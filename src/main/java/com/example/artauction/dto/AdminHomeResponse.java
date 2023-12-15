package com.example.artauction.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminHomeResponse{

    List<Map<String, Object>> auctions;
    List<UserDTO> artUsers;
    
}