package com.jj.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "user_details")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class StandardUser extends UserEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "work_role", nullable = false)
    private String workRole;

    @Column(name = "bio", columnDefinition = "TEXT", nullable = false)
    private String bio;

    @OneToMany(mappedBy = "standardUser")
    Set<UserProject> projects;
}
