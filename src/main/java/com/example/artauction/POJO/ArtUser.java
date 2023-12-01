package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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

}
