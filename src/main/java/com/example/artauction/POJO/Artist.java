package com.example.artauction.POJO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "Artist")
public class Artist extends ArtUser{

    public Artist(int tokens, String bio, String country) {
        super(tokens, bio, country, null,null,null);
    }

    @Column(name = "art_specialization")
    private String art_specialization;
}
