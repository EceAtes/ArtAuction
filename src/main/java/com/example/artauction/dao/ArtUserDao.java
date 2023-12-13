package com.example.artauction.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.artauction.POJO.ArtUser;

import jakarta.persistence.NamedNativeQuery;
//
//@NamedNativeQuery(name = "ArtUserDao.findFollowers",
//                  query = "SELECT *" + 
//                          "FROM ArtUser JOIN Follows ON ArtUser.user_id = Follows.follower_id" +
//                          "WHERE Follows.followed_id = :current_user_id")
//
//@NamedNativeQuery(name = "ArtUserDao.findFollowing",
//                  query = "SELECT *" + 
//                          "FROM ArtUser JOIN Follows ON ArtUser.user_id = Follows.followed_id" +
//                          "WHERE Follows.follower_id = :current_user_id")
//
public interface ArtUserDao extends JpaRepository<ArtUser, Integer> {

        //List<ArtUser> findFollowers(@Param("current_user_id")Integer user_id);
        //List<ArtUser> findFollowing(@Param("current_user_id")Integer user_id);
}
