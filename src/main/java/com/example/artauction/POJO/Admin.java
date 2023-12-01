package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "Admin")
public class Admin extends User{

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @Column(name = "highlighter_adminID")
    private Integer highlighterAdminId;

}
