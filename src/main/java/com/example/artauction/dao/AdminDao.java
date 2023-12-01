package com.example.artauction.dao;

import com.example.artauction.POJO.Admin;
import com.example.artauction.POJO.ArtUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDao extends JpaRepository<Admin, Integer> {
}
