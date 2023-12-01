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

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @OneToMany(mappedBy = "highlighterAdmin")
    private List<ArtUser> highlightedUsers;

}
