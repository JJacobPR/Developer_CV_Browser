package com.jj.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserRequestDto {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
}
