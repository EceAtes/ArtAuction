package com.example.artauction.POJO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "Collector")
public class Collector extends ArtUser{

    public Collector(int tokens, String bio, String country) {
        super(tokens, bio, country, null);
    }

    @Column(name = "art_tag")
    private String art_tag;
}
