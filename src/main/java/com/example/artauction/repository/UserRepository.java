package com.example.artauction.repository;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.fasterxml.jackson.core.JsonToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.UserDTO;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ResponseEntity<Integer> registerArtUser(UserDTO newUser){
        Integer cnt = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM `User` WHERE `email` =  ?", Integer.class, newUser.getEmail()
        );
        if(cnt <= 0){
            System.out.println("Registering User...");
            String sqlAddUser = "INSERT INTO `User` (name, email, password, role) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sqlAddUser, newUser.getName(), newUser.getEmail(), newUser.getPassword(), newUser.getRole());

            int userId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
            newUser.setUserID(cnt);

            if(newUser.getRole().equalsIgnoreCase("admin")){
                String sqlAddArtUser = "INSERT INTO `Admin` (`userID`, `specialization`) VALUES (?, ?)";
                jdbcTemplate.update(sqlAddArtUser, userId, "specialization");
                return new ResponseEntity<Integer>(userId,HttpStatus.OK);
            }
            else{
                String sqlAddArtUser = "INSERT INTO `ArtUser` (`userID`, `tokens`, `bio`, `country`, `highlighter_adminID`) VALUES (?, ?, ?, ?, ?)";
                jdbcTemplate.update(sqlAddArtUser, userId, 100, "hello world", "world", null); //test için 100 ekledim bütün user'lara otomatik olarak bunu sonra silelim

                System.out.println(newUser.getRole());
                if(newUser.getRole().equalsIgnoreCase("artist")){
                    String sqlAddArtist = "INSERT INTO `Artist` (`userID`, `art_specialization`) VALUES (?, ?)";
                    jdbcTemplate.update(sqlAddArtist, userId, "art_specialization");
                }
                else if(newUser.getRole().equalsIgnoreCase("collector")){
                    String sqlAddCollector = "INSERT INTO `Collector` (`userID`, `art_tag`) VALUES (?, ?)";
                    jdbcTemplate.update(sqlAddCollector, userId, "art_tag");
                }
                return new ResponseEntity<Integer>(userId,HttpStatus.OK);
            }
        }
        else{
            System.out.println("Email already registered!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<UserDTO> login(String email, String password){
        System.out.println("Login Credentials -> Email: " + email + " Password: " + password);
        String sqlLogin = "SELECT * FROM `User` WHERE `email` = ? AND `password` = ?";

        RowMapper<UserDTO> rowMapper = (rs, rowNum) -> {
            UserDTO user = new UserDTO();
            user.setUserID(rs.getInt("userID"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            return user;
        };

        try{
            UserDTO registeredUserDTO = jdbcTemplate.queryForObject(sqlLogin, new Object[]{email, password}, rowMapper);
            return new ResponseEntity<UserDTO>(registeredUserDTO, HttpStatus.OK);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println("Login failed - User doesn't exist");
            return new ResponseEntity<UserDTO>(new UserDTO(), HttpStatus.UNAUTHORIZED);
        }
    }

    public List<Map<String, Object>> getAllUsers(){
        //List<UserEntity> resultList = new ArrayList<UserEntity>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * FROM `User`");
        System.out.println("GET all Users executed");
        return rows;
    }

    public List<UserDTO> getAllArtUsers() {
        String sql = "SELECT * FROM `User` JOIN `ArtUser` ON `User`.`userID` = `ArtUser`.`userID` WHERE `role` = 'Artist' OR `role` = 'Collector'";
        List<UserDTO> artUsers = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserDTO.class));
        return artUsers;
    }

    public ResponseEntity<UserDTO> getSingleArtUser(int userID) {
        String sql = "SELECT * FROM `User` JOIN `ArtUser` ON `User`.`userID` = `ArtUser`.`userID` WHERE (`role` = 'Artist' OR `role` = 'Collector') AND `User`.userID = ?";
        try {
            UserDTO userDTO = jdbcTemplate.queryForObject(sql, new Object[]{userID}, new BeanPropertyRowMapper<>(UserDTO.class));
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No such user exists");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<UserDTO> getSingleUser(int userId){
        String sql = "SELECT * FROM `User` WHERE `userID` = ?";
        RowMapper<UserDTO> rowMapper = (rs, rowNum) -> {
            UserDTO user = new UserDTO();
            user.setUserID(rs.getInt("userID"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            return user;
        };

        try {
            return new ResponseEntity<UserDTO>(jdbcTemplate.queryForObject(sql, new Object[]{userId}, rowMapper), HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No such user exists");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public List<UserDTO> listHighlightedArtUsers() {
        String sql = "SELECT * FROM `User` JOIN `ArtUser` ON `User`.`userID` = `ArtUser`.`userID` WHERE highlighter_adminID IS NOT NULL";
        List<UserDTO> artUsers = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserDTO.class));
        return artUsers;
    }

    public ResponseEntity<HttpStatus> verifySale(Map<String, String> requestMap) {
        String userRole = requestMap.get("userRole");
        Integer bidID = jdbcTemplate.queryForObject("SELECT bidID FROM offer o NATURAL JOIN bid b WHERE o.auctionID = ? AND b.bid_status = ? ", new Object[]{requestMap.get("auctionID"), "Leading"}, Integer.class);
        String sql = "";
        if (userRole.equalsIgnoreCase("artist")) {
            sql = "UPDATE bid b SET b.approver_artist_ID = ? WHERE bidID = ?";
        } else if (userRole.equalsIgnoreCase("admin")) {
            sql = "UPDATE bid b SET b.approver_admin_ID = ? WHERE bidID = ?";
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        jdbcTemplate.update(sql, requestMap.get("userID"), bidID);

        if(requestMap.get("decision").equalsIgnoreCase("reject")){  //leading bid'i geri veriyorum, diğerlerine de lost diyorum
            Integer rejectedUserID = jdbcTemplate.queryForObject("SELECT o.collectorID FROM offer o NATURAL JOIN bid b WHERE o.auctionID = ? AND b.bid_status = ? ", new Object[]{requestMap.get("auctionID"), "Leading"}, Integer.class);
            String updateRejectedUser = "UPDATE artuser SET tokens = tokens + (SELECT bidAmount FROM bid WHERE bidID = ? LIMIT 1) WHERE userID = ?";
            jdbcTemplate.update(updateRejectedUser, bidID, rejectedUserID);
            String sqlUpdatelosingBids = "UPDATE bid SET bid_status = ? WHERE bidID != ? AND bidID IN " +
                    "(SELECT bidID FROM (SELECT bidID FROM offer o NATURAL JOIN bid WHERE o.auctionID = ?) AS subquery);";
            jdbcTemplate.update(sqlUpdatelosingBids, "Lost", bidID, requestMap.get("auctionID"));
            String sqlUpdateWinningBid = "UPDATE bid SET bid_status = ? WHERE bidID = ?;";
            jdbcTemplate.update(sqlUpdateWinningBid, "Rejected", bidID);
            String updateAuction = "UPDATE Auction SET auction_status = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "closed", requestMap.get("auctionID")); //"ended"?
            return new ResponseEntity<>(HttpStatus.ACCEPTED);//technically completed correctly?
        }

        String sqlToCheck = "SELECT approver_artist_ID, approver_admin_ID FROM bid WHERE bidID = ?";
        Map<String, Object> result = jdbcTemplate.queryForMap(sqlToCheck, bidID);

        Integer approverArtistID = (Integer) result.get("approver_artist_ID");
        Integer approverAdminID = (Integer) result.get("approver_admin_ID");

        if (approverArtistID != null && approverAdminID != null) {
            String sqlUpdatelosingBids = "UPDATE bid SET bid_status = ? WHERE bidID != ? AND bidID IN " +
                    "(SELECT bidID FROM (SELECT bidID FROM offer o NATURAL JOIN bid WHERE o.auctionID = ?) AS subquery);";
            jdbcTemplate.update(sqlUpdatelosingBids, "Lost", bidID, requestMap.get("auctionID"));
            String sqlUpdateWinningBid = "UPDATE bid SET bid_status = ? WHERE bidID = ?;";
            jdbcTemplate.update(sqlUpdateWinningBid, "Won", bidID);
            String updateAuction = "UPDATE Auction SET auction_status = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "closed", requestMap.get("auctionID"));   //"sold"?
            String updateArtist = "UPDATE artuser SET tokens = tokens + (SELECT bidAmount FROM bid WHERE bidID = ? LIMIT 1) WHERE userID = (SELECT uploaded_by_artist_ID FROM auction WHERE auctionID = ? LIMIT 1)";
            jdbcTemplate.update(updateArtist, bidID, requestMap.get("auctionID"));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else if(approverArtistID != null){
            String updateAuction = "UPDATE Auction SET auction_status = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "artist_ok", requestMap.get("auctionID"));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else if(approverAdminID != null){
            String updateAuction = "UPDATE Auction SET auction_status = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "admin_ok", requestMap.get("auctionID"));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    public List<Map<String, Object>> getFilteredAuctions(Map<String, Object> requestMap) {
        StringBuilder sqlBuilder = new StringBuilder("SELECT a.*, leadingBid " +
                "FROM (" +
                "SELECT a.*, " +
                "(SELECT b.bidAmount " +
                "FROM `Bid` b " +
                "JOIN `Offer` o ON o.bidID = b.bidID " +
                "WHERE o.auctionID = a.auctionID AND b.bid_status = ?) AS leadingBid " +
                "FROM `Auction` a " +
                ") a " +
                "WHERE 1=1");

        List<Object> params = new ArrayList<>();
        params.add("Leading");  //leadingle won arasında ayrım gerekirse (won'un fiyatına ulaşamazlarsa) bunu request varaible'ına dönüştür
        System.out.println("START");
        if (requestMap.containsKey("art_type")) {
            System.out.println("ENTERED");
            Object artTypesValue = requestMap.get("art_type");
            System.out.println(artTypesValue);
            if (artTypesValue instanceof List) {
                List<String> artTypes = (List<String>) artTypesValue;
                if (!artTypes.isEmpty()) {
                    sqlBuilder.append(" AND type IN (");
                    for (int i = 0; i < artTypes.size(); i++) {
                        sqlBuilder.append("?");
                        params.add(artTypes.get(i));
                        if (i < artTypes.size() - 1) {
                            sqlBuilder.append(", ");
                        }
                    }
                    sqlBuilder.append(")");
                }
            } else {
                sqlBuilder.append(" AND type = ?");
                params.add(requestMap.get("art_type"));
            }
        }

        if (requestMap.containsKey("minBidIncrease") ) {
            sqlBuilder.append(" AND minimumBidIncrease BETWEEN ? AND ?");
            params.add(requestMap.get("minBidIncrease"));
            params.add(requestMap.get("maxBidIncrease"));
        }

        if (requestMap.containsKey("minCreationDate") ) {
            sqlBuilder.append(" AND creationDate BETWEEN ? AND ?");
            params.add(requestMap.get("minCreationDate"));
            params.add(requestMap.get("maxCreationDate"));
        }

        if (requestMap.containsKey("minStartDate") ) {
            sqlBuilder.append(" AND startDate BETWEEN ? AND ?");
            params.add(requestMap.get("minStartDate"));
            params.add(requestMap.get("maxStartDate"));
        }

        if (requestMap.containsKey("minEndDate")) {
            sqlBuilder.append(" AND endDate BETWEEN ? AND ?");
            params.add(requestMap.get("minEndDate"));
            params.add(requestMap.get("maxEndDate"));
        }

        if (requestMap.containsKey("auction_status")) {
            sqlBuilder.append(" AND auction_status = ?");
            params.add(requestMap.get("auction_status"));
        }

        if (requestMap.containsKey("isEnded")) {
            sqlBuilder.append(" AND isEnded = ?");
            params.add(requestMap.get("isEnded"));
        }

        if (requestMap.containsKey("baseBid")) {
            sqlBuilder.append(" AND baseBid = ?");
            params.add(requestMap.get("baseBid"));
        }

        if (requestMap.containsKey("minLeadingBid")) {
            sqlBuilder.append(" AND leadingBid BETWEEN ? AND ?");
            params.add(requestMap.get("minLeadingBid"));
            params.add(requestMap.get("maxLeadingBid"));
        }

        if(requestMap.get("userType").equals("Artist")){
            sqlBuilder.append(" AND uploaded_by_artist_ID = ?");
            params.add(requestMap.get("userID"));
        }


        if(requestMap.get("userType").equals("Collector")){
            sqlBuilder.append(" AND auctionID IN (SELECT offer.auctionID FROM offer NATURAL JOIN bid b WHERE offer.collectorID = ?");
            params.add(requestMap.get("userID"));
            if(requestMap.containsKey("currentUserLeading") && ((boolean) requestMap.get("currentUserLeading"))){
                sqlBuilder.append(" AND b.bid_status = ?");
                params.add("Leading");
            }
            sqlBuilder.append(")");
        }



        String sql = sqlBuilder.toString();
        System.out.println(sql);
        List<Map<String, Object>> auctions = jdbcTemplate.queryForList(sql, params.toArray());
        return auctions;

    }
}
