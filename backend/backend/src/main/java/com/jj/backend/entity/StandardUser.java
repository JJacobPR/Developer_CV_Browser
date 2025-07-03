package com.jj.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "user_details")
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class StandardUser extends UserEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "work_role")
    private String workRole;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;
}
