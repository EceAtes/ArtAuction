package com.example.artauction.dao;

import com.example.artauction.POJO.ArtUser;
import com.example.artauction.POJO.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtUserDAo extends JpaRepository<ArtUser, Integer> {
}
