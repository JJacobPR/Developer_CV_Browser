package com.jj.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserCreateResponseDto {
    private Integer id;
    private String email;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String role;
}
