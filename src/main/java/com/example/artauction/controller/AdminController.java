package com.example.artauction.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artauction.dto.AdminHomeResponse;
import com.example.artauction.dto.UserDTO;
import com.example.artauction.repository.AdminRepository;
import com.example.artauction.repository.AuctionRepository;
import com.example.artauction.repository.UserRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")

public class AdminController {

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
        List<Map<String, Object>> auctionList = auctionRepository.getAllAuctions();
        List<UserDTO> artUserList = userRepository.getAllArtUsers();

        return new AdminHomeResponse(auctionList, artUserList);
    }

    @PatchMapping(path= "/highlight_artuser")
    public ResponseEntity<String> highlightArtUser(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.highlight_artuser(requestMap.get("admin_id"), requestMap.get("artuser_id"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to highlight user", HttpStatus.BAD_REQUEST);
    }

    @PatchMapping(path= "/highlight_auction")
    public ResponseEntity<String> highlightAuction(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.highlight_auction(requestMap.get("admin_id"), requestMap.get("auction_id"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to highlight auction", HttpStatus.BAD_REQUEST);
    }

    @PatchMapping(path= "/verify_auction")
    public ResponseEntity<String> verifyAuction(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.verify_auction(requestMap.get("admin_id"), requestMap.get("auction_id"), requestMap.get("isApproved"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to verify auction", HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping(path = "/proposed_auctions")
    public List<Map<String, Object>> listProposedAuctions(){
        try{
            return auctionRepository.listProposedAuctions();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(path = "/create_exh")
    public ResponseEntity<String> createExhibition(@RequestBody(required = true) Map<String, String> requestMap){
        try{
            return adminRepository.createExhibition(Integer.parseInt(requestMap.get("admin_id")), requestMap.get("title"), requestMap.get("description"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to create exhibition", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/delete_exh")
    public ResponseEntity<String> deleteExhibition(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.deleteExhibition(requestMap.get("exhibitionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to delete exhibition", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/add_auction_to_exh")
    public ResponseEntity<String> addAuctionToExhibiton(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.addAuctionToExhibiton(requestMap.get("exhibitionID"), requestMap.get("auctionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
        
    @PostMapping(path = "/remove_auction_from_exh")
    public ResponseEntity<String> removeAuctionFromExhibiton(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return adminRepository.removeAuctionFromExhibition(requestMap.get("exhibitionID"), requestMap.get("auctionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
