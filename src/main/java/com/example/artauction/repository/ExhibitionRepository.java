package com.example.artauction.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ExhibitionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExhibitionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    } 

    /*
    public List<ExhibitionDTO> listAllExhibitions() {
        return null;
    }

    public ExhibitionDTO listSingleExhibition() {
        return null;
    }*/
}
