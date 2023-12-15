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

    public ResponseEntity<HttpStatus> registerArtUser(UserDTO newUser){
        Integer cnt = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM `User` WHERE `email` =  ?", Integer.class, newUser.getEmail()
        );
        if(cnt <= 0){
            System.out.println("Registering User...");
            String sqlAddUser = "INSERT INTO `User` (name, email, password, role) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sqlAddUser, newUser.getName(), newUser.getEmail(), newUser.getPassword(), newUser.getRole());

            int userId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
            newUser.setUserID(cnt);

            if(newUser.getRole().equals("Admin")){
                String sqlAddArtUser = "INSERT INTO `Admin` (`userID`, `specialization`) VALUES (?, ?)";
                jdbcTemplate.update(sqlAddArtUser, userId, "specialization");
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else{
                String sqlAddArtUser = "INSERT INTO `ArtUser` (`userID`, `tokens`, `bio`, `country`, `highlighter_adminID`) VALUES (?, ?, ?, ?, ?)";
                jdbcTemplate.update(sqlAddArtUser, userId, 0, "hello world", "world", null);

                System.out.println(newUser.getRole());
                if(newUser.getRole().equals("Artist")){
                    String sqlAddArtist = "INSERT INTO `Artist` (`userID`, `art_specialization`) VALUES (?, ?)";
                    jdbcTemplate.update(sqlAddArtist, userId, "art_specialization");
                }
                else if(newUser.getRole().equals("Collector")){
                    String sqlAddCollector = "INSERT INTO `Collector` (`userID`, art_tag`) VALUES (?, ?)";
                    jdbcTemplate.update(sqlAddCollector, userId, "art_tag");
                }
                return new ResponseEntity<>(HttpStatus.OK);
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
        String sql = "SELECT * FROM `User` JOIN `ArtUser` WHERE `role` = \"Artist\" OR `role` = \"Collector\"";
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
}
