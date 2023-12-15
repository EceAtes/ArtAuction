package com.example.artauction.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.artauction.dto.UserDTO;
import com.example.artauction.repository.AuctionRepository;
import com.example.artauction.repository.ExhibitionRepository;
import com.example.artauction.repository.UserRepository;

@RestController
@RequestMapping("/editors-picks")
@CrossOrigin(origins = "http://localhost:3000")
public class EditorsPickContoller {

    private AuctionRepository auctionRepository;
    private UserRepository userRepository;
    private ExhibitionRepository exhibitionRepository;

    @Autowired
    public EditorsPickContoller(AuctionRepository auctionRepository, UserRepository userRepository, ExhibitionRepository exhibitionRepository){
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
        this.exhibitionRepository = exhibitionRepository;
    }

    @GetMapping(path= "/highlighted_artusers")
    public List<UserDTO> listHighlightedArtUsers(){
        try{
            return userRepository.listHighlightedArtUsers();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path= "/highlighted_auctions")
    public List<Map<String, Object>> listHighlightedAuctions(){
        try{
            return auctionRepository.listHighlightedAuctions();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /*
    @GetMapping(path= "/exhibitions")
    public List<ExhibitionDTO> listAllExhibitions(){
        try{
            return exhibitionRepository.listAllExhibitions();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path= "/exhibitions/{exhibition_ID}")
    public ExhibitionDTO listSingleExhibition(@PathVariable String userID){
        try{
            return exhibitionRepository.listSingleExhibition();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    */
}
