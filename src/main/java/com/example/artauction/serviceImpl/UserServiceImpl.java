package com.example.artauction.serviceImpl;

import com.example.artauction.POJO.Admin;
import com.example.artauction.POJO.Artist;
import com.example.artauction.POJO.Collector;
import com.example.artauction.POJO.User;
import com.example.artauction.dao.UserDao;
import com.example.artauction.service.UserService;
import com.example.artauction.utils.ArtAuctionUtils;
import com.example.artauction.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignUp(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    try{
                        userDao.save(getUserFromRequest(requestMap));
                    } catch (Exception e){
                        e.printStackTrace();
                        return ArtAuctionUtils.getResponseEntity("Error occurred while creating a new user", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                    return ArtAuctionUtils.getResponseEntity("User is successfully created", HttpStatus.OK);
                } else {
                    return ArtAuctionUtils.getResponseEntity("Email is already used", HttpStatus.BAD_REQUEST);
                }
            } else {
                return ArtAuctionUtils.getResponseEntity("Invalid sign up data", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return ArtAuctionUtils.getResponseEntity("Some error occurred in user registration (Service Impl)", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try { //ypu can check user status here
            return new ResponseEntity<>(userDao.getAllUsers(), HttpStatus.OK);
            //return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUp(Map<String, String> requestMap){
        if(requestMap.containsKey("name") && requestMap.containsKey("password") && requestMap.containsKey("email")){
            return true;
        }
        return false;
    }


    private User getUserFromRequest(Map<String, String> requestMap){
        User user;
        System.out.println("ENTERED getUserFromRequest");
        if(requestMap.get("accountType").equals("Artist")){
            System.out.println("ENTERED ARTIST");
            user = new Artist(0, "", "");
        } else if (requestMap.get("accountType").equals("Collector")){
            System.out.println("ENTERED Collector");
            user = new Collector(0, "", "");
        } else if (requestMap.get("accountType").equals("Admin")){
            System.out.println("ENTERED Admin");
            user = new Admin(requestMap.get("specialization"), null);
        }else {
            throw new IllegalArgumentException("Invalid account type: " + requestMap.get("accountType"));
        }
        user.setName(requestMap.get("name"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        return user;
    }
}
