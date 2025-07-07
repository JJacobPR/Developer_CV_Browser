package com.jj.backend.dto;

import lombok.Getter;


@Getter
public class StandardUserRequestDto {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
}
