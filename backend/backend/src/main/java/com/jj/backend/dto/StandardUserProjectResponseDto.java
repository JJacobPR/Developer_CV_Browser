package com.jj.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserProjectResponseDto {
    private Integer id;
    private String email;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
    private String projectRole;
}
