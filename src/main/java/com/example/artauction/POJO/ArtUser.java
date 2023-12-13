package com.example.artauction.POJO;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
            joinColumns = @JoinColumn(name = "followed_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private List<ArtUser> followers;

    @ManyToMany(mappedBy = "followers", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ArtUser> followedUsers;


}
