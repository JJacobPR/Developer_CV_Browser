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
public class LoginResponseDto {

    private Integer id;
    private String email;
    private LocalDateTime createdAt;
    private String token;
    private String tokenType = "Bearer";
    private String role;
}
