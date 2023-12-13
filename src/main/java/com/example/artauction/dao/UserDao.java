package com.example.artauction.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.artauction.POJO.User;
import com.example.artauction.wrapper.UserWrapper;

                         
public interface UserDao extends JpaRepository<User, Integer> {

    //@Param("email") and String email names should be the same
    User findByEmailId(@Param("email")String email);

    //List<UserWrapper> getAllUsers();

    @Query(value = "SELECT * FROM user WHERE user_id = :userId", nativeQuery = true)
    List<User> findByUserId(@Param("userId") Integer userId);

    @Query(value = "SELECT * FROM ser WHERE user_id = :userId", nativeQuery = true)
    List<User> findAllUsers(@Param("userId") Integer userId);

}


