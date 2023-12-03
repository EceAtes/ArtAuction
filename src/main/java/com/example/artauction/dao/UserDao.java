package com.example.artauction.dao;

import com.example.artauction.POJO.User;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDao extends JpaRepository<User, Integer> {

    //@Param("email") and String email names should be the same
    User findByEmailId(@Param("email")String email);

    List<UserWrapper> getAllUsers();


}


