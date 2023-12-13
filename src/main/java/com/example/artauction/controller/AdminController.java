package com.example.artauction.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.dto.AdminHomeResponse;
import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.repository.AdminRepository;
import com.example.artauction.repository.AuctionRepository;
import com.example.artauction.repository.UserRepository;

@RestController
@RequestMapping("/admin")
public class AdminController {
/*
    private AdminRepository adminRepository;
    private AuctionRepository auctionRepository;
    private UserRepository userRepository;

    @Autowired
    public AdminController(AdminRepository adminRepository, AuctionRepository auctionRepository, UserRepository userRepository){
        this.adminRepository = adminRepository;
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping(value= "/home")
    public AdminHomeResponse adminHome(){
        List<AuctionDTO> auctionList = auctionRepository.getAllAuctions();
        List<ArtUserDTO> artUserList = userRepository.getAllArtUsers();

        return new AdminHomeResponse(auctionList, artUserList);
    }

    @PatchMapping(path= "/highlight_artuser")
    public ResponseEntity<String> highlightArtUser(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.highlight_artuser(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to highlight user", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PatchMapping(path= "/highlight_auction")
    public ResponseEntity<String> highlightAuction(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.highlight_auction(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to highlight auction", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PatchMapping(path= "/verify_auction")
    public ResponseEntity<String> verifyAuction(@RequestBody(required = true) Map<String, String> requestMap){
        try{
            return adminRepository.verify_auction(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("An error has occurred while trying to verify auction", HttpStatus.INTERNAL_SERVER_ERROR);
    }
*/
}
