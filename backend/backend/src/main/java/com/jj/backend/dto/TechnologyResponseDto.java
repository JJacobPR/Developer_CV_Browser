package com.jj.backend.dto;


import com.jj.backend.config.TechnologyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechnologyResponseDto {

    private int id;
    private String name;
    private TechnologyType type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
