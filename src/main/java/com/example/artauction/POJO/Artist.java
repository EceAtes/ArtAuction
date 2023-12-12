package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

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

    @OneToMany(mappedBy = "uploaded_by_artist", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Auction> uploadedAuctions;

    @Override
    public String toString() {
        return "Artist{" +
                "art_specialization='" + art_specialization + '\'' +
                '}';
    }
}
