package com.jj.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardUserFullResponseDto  {
    private Integer id;
    private String email;
    private String name;
    private String surname;
    private String phoneNumber;
    private String workRole;
    private String bio;
    private List<ProjectResponseDto> projects;
}
