package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ArtUser")
@DynamicInsert
@DynamicUpdate
@Inheritance(strategy = InheritanceType.JOINED)
public class ArtUser extends User{

    @Column(name = "tokens", nullable = false)
    private int tokens;

    @Column(name = "bio", nullable = false)
    private String bio;

    @Column(name = "country", nullable = false)
    private String country;

    @ManyToOne
    private Admin highlighterAdmin;


    @ManyToMany
    @JoinTable(
            name = "follows",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    private List<ArtUser> followers;

    @ManyToMany(mappedBy = "followers")
    private List<ArtUser> followedUsers;


}
