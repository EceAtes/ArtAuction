package com.example.artauction.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionWrapper {
    private Integer id;
    private String title;
    private String status;
}


