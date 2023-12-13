package com.example.artauction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //default constructor & getter and setters
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer userID;
    private String name;
    private String email;
    private String password;
    private int tokens;
    private String bio;
    private String country;
    private int highlighter_adminID;
    private String role;
}
