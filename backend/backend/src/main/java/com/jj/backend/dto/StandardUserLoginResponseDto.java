package com.jj.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserLoginResponseDto extends LoginResponseDto {

    private String name;
    private String surname;
    private String workRole;
    private String phoneNumber;
    private String bio;

}
