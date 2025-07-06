package com.jj.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseDto {

    private String name;
    private String companyName;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;
    private List<StandardUserProjectResponseDto> users = new ArrayList<>();
    private List<TechnologyResponseDto> technologies = new ArrayList<>();

}
