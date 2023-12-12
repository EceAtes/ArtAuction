package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
@Table(name = "Admin")
public class Admin extends User{

    @Column(name = "specialization")
    private String specialization;

    @OneToMany(mappedBy = "highlighterAdmin", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ArtUser> highlightedUsers;

    @OneToMany(mappedBy = "highlighter_admin", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Auction> highlightedAuctions;

    @OneToMany(mappedBy = "verifier_admin", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Auction> verifiedAuctions;

    @Override
    public String toString() {
        return "Admin{" +
                "specialization='" + specialization + '\'' +
                '}';
    }
}
