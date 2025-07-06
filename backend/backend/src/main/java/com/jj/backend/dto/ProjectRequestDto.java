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
public class ProjectRequestDto {
    private Integer userId;
    private String name;
    private String companyName;
    private String description;
    private String projectRole;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<Integer> technologies = new ArrayList<>();
}
