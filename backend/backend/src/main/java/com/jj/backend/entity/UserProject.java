package com.jj.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users_projects")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    StandardUser standardUser;

    @ManyToOne
    @JoinColumn(name = "project_id")
    Project project;

    @Column(name = "project_role", nullable = false)
    String projectRole;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

}
