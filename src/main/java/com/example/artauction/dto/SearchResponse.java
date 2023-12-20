package com.example.artauction.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    List<Map<String, Object>> artists;
    List<Map<String, Object>> collectors;
    List<Map<String, Object>> auctions;
    List<Map<String, Object>> collections;
    List<Map<String, Object>> exhibitions;
}
