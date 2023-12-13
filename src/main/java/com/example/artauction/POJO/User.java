package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;

@NamedQuery(name = "User.findByEmailId", query = "select u from User u where u.email =:email")
//@NamedQuery(name = "User.getAllUsers", query = "select new com.example.artauction.wrapper.UserWrapper(u.user_id,u.name, u.email) from User u")
//u.email represent this class' varaibles, :email represents the parameter from UserDao (parameter name and the declaration should be same there)
@Data //default constructor & getter and setters
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
}
