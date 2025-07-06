package com.jj.backend.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserCreateRequestDto {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
}
