package com.example.artauction.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.artauction.POJO.User;
import com.example.artauction.wrapper.UserWrapper;

public interface UserDao extends JpaRepository<User, Integer> {

    //@Param("email") and String email names should be the same
    User findByEmailId(@Param("email")String email);

    List<UserWrapper> getAllUsers();
}


