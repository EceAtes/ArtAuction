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

    @Column(name = "tokens")
    private int tokens;

    @Column(name = "bio")
    private String bio;

    @Column(name = "country")
    private String country;

    @ManyToOne
    private Admin highlighterAdmin;


    @ManyToMany
    @JoinTable(
            name = "follows",
            joinColumns = @JoinColumn(name = "followed_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private List<ArtUser> followers;

    @ManyToMany(mappedBy = "followers", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ArtUser> followedUsers;


}
