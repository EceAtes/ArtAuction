package com.example.artauction.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.dto.CollectionDTO;

@Repository
public class CollectionRepository {

    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public CollectionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CollectionDTO> listAllCollectionsOfUser(int userID) {
        String sql = "SELECT c.* " +
                     "GROUP_CONCAT(t.auctionID) AS auctionIDs " +
                     "FROM collection c " +
                     "LEFT JOIN collect t ON c.collectionID = t.collectionID " +
                     "WHERE c.creator_collectorID = ?" +
                     "GROUP BY c.collectionID";
    
        List<CollectionDTO> collectionDTOList = jdbcTemplate.query(sql, new Object[]{userID}, (resultSet, i) -> {
            CollectionDTO collectionDTO = new CollectionDTO();
            collectionDTO.setCollectionID(resultSet.getInt("collectionID"));
            collectionDTO.setCollectionName(resultSet.getString("collection_name"));
    
            String auctionIDs = resultSet.getString("auctionIDs");
            if (auctionIDs != null) {
                String[] auctionIDArray = auctionIDs.split(",");
                for (String auctionID : auctionIDArray) {
                    String sqlAuction = "SELECT * FROM `Auction` WHERE `auctionID` = ?";
                    RowMapper<AuctionDTO> rowMapper = (rs, rowNum) -> {
                        AuctionDTO auction = new AuctionDTO();
                        auction.setAuctionID(Integer.parseInt(auctionID));
                        auction.setTitle(rs.getString("title"));
                        return auction;
                    };
                    AuctionDTO auction = jdbcTemplate.queryForObject(sqlAuction, rowMapper, Integer.parseInt(auctionID));
                    collectionDTO.getAuctions().add(auction);
                }
            }
            return collectionDTO;
        });
    
        return collectionDTOList;
    }

    public CollectionDTO listSingleCollection(int collectionID) {
        String sql = "SELECT c.*, t.auctionID " +
                "FROM collection c " +
                "LEFT JOIN collect t ON c.collectionID = t.collectionID " +
                "WHERE c.collectionID = ?";

        List<CollectionDTO> collectionList = jdbcTemplate.query(sql, (resultSet, i) -> {
        CollectionDTO collectionDTO = new CollectionDTO();
        collectionDTO.setCollectionID(resultSet.getInt("collectionID"));
        collectionDTO.setCollectionName(resultSet.getString("collection_name"));

        int auctionId = resultSet.getInt("auctionID");
        if (auctionId > 0) {
            String sqlAuction = "SELECT * FROM `Auction` WHERE `auctionID` = ?";
            RowMapper<AuctionDTO> rowMapper = (rs, rowNum) -> {
                AuctionDTO auction = new AuctionDTO();
                auction.setAuctionID(auctionId);
                auction.setTitle(rs.getString("title"));
                return auction;
            };
            AuctionDTO auction = jdbcTemplate.queryForObject(sqlAuction, rowMapper, auctionId);
            collectionDTO.getAuctions().add(auction);
        }
        return collectionDTO;
    },
    collectionID);

    if (collectionList.isEmpty()) { return null; }
    CollectionDTO collectionDTO = collectionList.get(0);

        return collectionDTO;
    }

    public ResponseEntity<String> createCollection(int userID, String name, int auctionID) {
        String sqlAddExh = "INSERT INTO `Collection` (collection_name, creator_collectorID) VALUES (?, ?)";
        jdbcTemplate.update(sqlAddExh, name, userID);

        String sqlExhId = "SELECT LAST_INSERT_ID()";
        int collectionID = jdbcTemplate.queryForObject(sqlExhId, Integer.class);

        String sqlAddAuction = "INSERT INTO `Collect` (collectionID, auctionID) VALUES (?, ?)";
        jdbcTemplate.update(sqlAddAuction, collectionID, auctionID);
        return new ResponseEntity<>("Collection created and auction " + auctionID + " added", HttpStatus.OK);
    }

    // curatetekiler gidiyor mu? evet
    public ResponseEntity<String> deleteCollection(Integer collectionID) {
        String sqlDelCol = "DELETE FROM `Collection` WHERE collectionID = ?";
        jdbcTemplate.update(sqlDelCol, collectionID);
        return new ResponseEntity<>("Collection deleted", HttpStatus.OK);

    }

    public List<Map<String, String>> addAuctionMenuCollection(Integer auctionID) {
        String sql = "SELECT *, " +
        "CASE WHEN t.auctionID IS NOT NULL THEN true ELSE false END AS hasAuction " +
        "FROM collection c " +
        "LEFT JOIN collect t ON c.collectionID = t.collectionID AND t.auctionID = ?";

        List<Map<String, String>> collectionList = jdbcTemplate.query(sql, new Object[]{auctionID}, (resultSet, i) -> {
        Map<String, String> collection = new HashMap();
        collection.put("collectionID", String.valueOf(resultSet.getInt("collectionID")));
        collection.put("collection_name", String.valueOf(resultSet.getString("collection_name")));
        collection.put("hasAuction", String.valueOf(resultSet.getBoolean("hasAuction")));

        return collection;
        });
        return collectionList;
    }

    public ResponseEntity<String> addAuctionToCollection(Integer collectionID, Integer auctionID) {
        String sqlAdd = "INSERT INTO `Collect` (collectionID, auctionID) VALUES (?, ?)";
        jdbcTemplate.update(sqlAdd, collectionID, auctionID);
        return new ResponseEntity<>("Auction " + auctionID + " added to " + collectionID, HttpStatus.OK);

    }

    public ResponseEntity<String> removeAuctionFromCollection(Integer collectionID, Integer auctionID) {
        String sqlDelete = "DELETE FROM `Collect` WHERE collectionID = ? AND auctionID = ?";
        jdbcTemplate.update(sqlDelete, collectionID, auctionID);
        return new ResponseEntity<>("Auction " + auctionID + " removed from " + collectionID, HttpStatus.OK);

    }
}
