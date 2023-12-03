package com.example.artauction.serviceImpl;

import com.example.artauction.POJO.Admin;
import com.example.artauction.POJO.ArtUser;
import com.example.artauction.dao.UserDao;
import com.example.artauction.service.AdminService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    UserDao userDao;

    @Override
    @Transactional
    public ResponseEntity<String> highlight_artuser(Map<String, Integer> requestMap) {
        log.info("Inside highlight_artuser {}", requestMap);
        ArtUser highlighted_user;
        Admin admin;
        Object user;

        try{
            user = userDao.getReferenceById(requestMap.get("highlighted_user_id"));
            if (user instanceof HibernateProxy) {
                highlighted_user = (ArtUser) Hibernate.unproxy(user);
            } else {
                highlighted_user = (ArtUser) user;
            }
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("highlighted user doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user = userDao.getReferenceById(requestMap.get("admin_id"));
        if (user instanceof HibernateProxy) {
            admin = (Admin) Hibernate.unproxy(user);
        } else {
            admin = (Admin) user;
        }
        admin.getHighlightedUsers().add(highlighted_user);
        highlighted_user.setHighlighterAdmin(admin);
        return new ResponseEntity<>(highlighted_user.getName() + " successfully highlighted", HttpStatus.OK);
    }
}
