package com.example.artauction.controller;

import com.example.artauction.dto.CollectionDTO;
import com.example.artauction.repository.AuctionRepository;
import com.example.artauction.repository.CollectionRepository;
import com.example.artauction.repository.CollectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collector")
@CrossOrigin(origins = "http://localhost:3000")
public class CollectorController {

    private CollectorRepository collectorRepository;
    private CollectionRepository collectionRepository;
    private AuctionRepository auctionRepository;

    @Autowired
    public CollectorController(CollectorRepository collectorRepository, CollectionRepository collectionRepository, AuctionRepository auctionRepository) {
        this.collectorRepository = collectorRepository;
        this.collectionRepository = collectionRepository;
        this.auctionRepository = auctionRepository;
    }

    @PatchMapping("/collectorInfo/{userID}") //includes auction and account data
    public List<Map<String,Object>> getCollectorInfo(@PathVariable String userID){
        return collectorRepository.getCollectorInfo(Integer.parseInt(userID));
    }

    @PostMapping("/bid")
    public ResponseEntity<HttpStatus> bid(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.bid(requestMap.get("collectorID"), requestMap.get("auctionID"), requestMap.get("bidAmount"));
    }

    @GetMapping("/bidHistory")
    public List<Map<String,Object>> seeBidHistory(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.seeBidHistory(requestMap.get("userID"), requestMap.get("auctionID"));
    }

    @GetMapping(path= "/collections/{user_id}")
    public List<CollectionDTO> listAllCollectionsOfUser(@PathVariable String user_id){
        try{
            return collectionRepository.listAllCollectionsOfUser(Integer.parseInt(user_id));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path= "/collections/{collection_id}")
    public CollectionDTO listSingleCollection(@PathVariable String collection_id){
        try{
            return collectionRepository.listSingleCollection(Integer.parseInt(collection_id));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(path = "/create_col")
    public ResponseEntity<String> createCollection(@RequestBody(required = true) Map<String, String> requestMap){
        try{
            return collectionRepository.createCollection(Integer.parseInt(requestMap.get("user_id")), requestMap.get("name"), Integer.parseInt(requestMap.get("auction_id")));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to create collection", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/delete_col")
    public ResponseEntity<String> deleteCollection(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return collectionRepository.deleteCollection(requestMap.get("collectionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("An error has occurred while trying to delete collection", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/add_auction_menu")
    public List<Map<String,String>> addAuctionMenuCollection(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return collectionRepository.addAuctionMenuCollection(requestMap.get("auctionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }       

    @PostMapping(path = "/add_auction_to_col")
    public ResponseEntity<String> addAuctionToCollection(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return collectionRepository.addAuctionToCollection(requestMap.get("collectionID"), requestMap.get("auctionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
        
    @PostMapping(path = "/remove_auction_from_col")
    public ResponseEntity<String> removeAuctionFromCollection(@RequestBody(required = true) Map<String, Integer> requestMap){
        try{
            return collectionRepository.removeAuctionFromCollection(requestMap.get("collectionID"), requestMap.get("auctionID"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    @PostMapping("/save")
    public ResponseEntity<HttpStatus> save(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.save(requestMap);
    }

    @PatchMapping("/getTokens")
    public ResponseEntity<HttpStatus> getTokens(@RequestBody(required = true) Map<String, Integer> requestMap){
        return collectorRepository.getTokens(requestMap.get("userID"), requestMap.get("tokens"));
    }

    @GetMapping(path = "pastAuctions/{userID}")
    public List<Map<String, Object>> getPastAuctionsCollector(@PathVariable String userID) {
        return auctionRepository.getPastAuctionsCollector(Integer.parseInt(userID));
    }

    @GetMapping(path = "ongoingAuctions/{userID}")
    public List<Map<String, Object>> getOngoingAuctionsCollector(@PathVariable String userID) {
        return auctionRepository.getOngoingAuctionsCollector(Integer.parseInt(userID));
    }

    @GetMapping(path = "savedAuctions/{userID}")
    public List<Map<String, Object>> getSavedAuctionsCollector(@PathVariable String userID) {
        return auctionRepository.getSavedAuctionsCollector(Integer.parseInt(userID));
    }
}
