package com.jj.backend.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@Getter
public class ProjectRequestDto {
    private Integer userId;
    private String name;
    private String companyName;
    private String description;
    private String projectRole;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private final List<Integer> technologies = new ArrayList<>();
}
