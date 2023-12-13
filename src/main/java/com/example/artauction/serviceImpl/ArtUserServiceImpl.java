package com.example.artauction.serviceImpl;

import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.artauction.POJO.ArtUser;
import com.example.artauction.POJO.User;
import com.example.artauction.dao.ArtUserDao;
import com.example.artauction.dao.UserDao;
import com.example.artauction.service.ArtUserService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ArtUserServiceImpl implements ArtUserService {
    @Autowired
    UserDao userDao;
    ArtUserDao artUserDao;

    @Override
    @Transactional
    public ResponseEntity<String> follow(Map<String, Integer> requestMap) {
        log.info("Inside follow map {}", requestMap);
        ArtUser followed_user;
        ArtUser follower_user;
        Object user;
        try{
            user = userDao.getReferenceById(requestMap.get("followed_id"));
            if (user instanceof HibernateProxy) {
                followed_user = (ArtUser) Hibernate.unproxy(user);
            } else {
                followed_user = (ArtUser) user;
            }
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("The user doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user = userDao.getReferenceById(requestMap.get("follower_id"));
        if (user instanceof HibernateProxy) {
            follower_user = (ArtUser) Hibernate.unproxy(user);
        } else {
            follower_user = (ArtUser) user;
        }
        follower_user.getFollowedUsers().add(followed_user);
        followed_user.getFollowers().add(follower_user);
        return new ResponseEntity<>(follower_user.getName() + " successfully followed " + followed_user, HttpStatus.OK);
    }




    /*
    @Override
    public ResponseEntity<List<ArtUser>> findFollowing(Map<String, Integer> requestMap) {
        log.info("Inside follow map {}", requestMap);
        User currentUser = userDao.findByUserId(requestMap.get("user_id"));
        if(Objects.isNull(currentUser)){
            return new ResponseEntity<List<ArtUser>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<List<ArtUser>>(artUserDao.findFollowing(currentUser.getUser_id()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ArtUser>> findFollowerUsers(Map<String, Integer> requestMap) {
        log.info("Inside follow map {}", requestMap);
        User currentUser = userDao.findByUserId(requestMap.get("user_id"));
        if(Objects.isNull(currentUser)){
            return new ResponseEntity<List<ArtUser>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<List<ArtUser>>(artUserDao.findFollowers(currentUser.getUser_id()), HttpStatus.OK);
    }*/
}
