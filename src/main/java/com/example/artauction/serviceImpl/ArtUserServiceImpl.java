package com.example.artauction.serviceImpl;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

/*
@Slf4j
@Service
public class ArtUserServiceImpl implements ArtUserService {
    @Autowired
    UserDao userDao;

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
}

*/