package com.example.artauction.repository;

import java.util.List;
import java.util.Map;

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
        if (userRole.equals("Artist")) {
            sql = "UPDATE bid b SET b.approver_artist_ID = ? WHERE bidID = ?";
        } else if (userRole.equals("Admin")) {
            sql = "UPDATE bid b SET b.approver_admin_ID = ? WHERE bidID = ?";
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        jdbcTemplate.update(sql, requestMap.get("userID"), bidID);

        if(requestMap.get("decision").equals("Reject")){  //leading bid'i geri veriyorum, diğerlerine de lost diyorum
            String sqlUpdatelosingBids = "UPDATE bid SET bid_status = ? WHERE bidID != ? AND bidID IN " +
                    "(SELECT bidID FROM (SELECT bidID FROM offer o NATURAL JOIN bid WHERE o.auctionID = ?) AS subquery);";
            jdbcTemplate.update(sqlUpdatelosingBids, "Lost", bidID, requestMap.get("auctionID"));
            String sqlUpdateWinningBid = "UPDATE bid SET bid_status = ? WHERE bidID = ?;";
            jdbcTemplate.update(sqlUpdateWinningBid, "Rejected", bidID);
            String updateRejectedUser = "UPDATE artuser SET tokens = tokens + (SELECT bidAmount FROM bid WHERE bidID = ? LIMIT 1)";
            jdbcTemplate.update(updateRejectedUser, bidID); //"ended"?
            String updateAuction = "UPDATE Auction SET auction_status = ?, isEnded = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "closed", true, requestMap.get("auctionID")); //"ended"?
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
            String updateAuction = "UPDATE Auction SET auction_status = ?, isEnded = ? WHERE auctionID = ?;";
            jdbcTemplate.update(updateAuction, "closed", true, requestMap.get("auctionID"));   //"sold"?
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
