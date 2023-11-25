package com.example.artauction.serviceImpl;

import com.example.artauction.POJO.User;
import com.example.artauction.dao.UserDao;
import com.example.artauction.service.UserService;
import com.example.artauction.utils.ArtAuctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
                    userDao.save(getUserFromRequest(requestMap));
                    return ArtAuctionUtils.getResponseEntity("User is ssuccessfully created", HttpStatus.OK);
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

    private boolean validateSignUp(Map<String, String> requestMap){
        if(requestMap.containsKey("name") && requestMap.containsKey("password") && requestMap.containsKey("email")){
            return true;
        }
        return false;
    }


    private User getUserFromRequest(Map<String, String> requestMap){
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        return user;
    }
}
