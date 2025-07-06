package com.jj.backend.service.service;

import com.jj.backend.dto.ProjectRequestDto;
import com.jj.backend.dto.ProjectResponseDto;
import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface ProjectService {
    List<ProjectResponseDto> getAllProjects();
    Project saveProject(Project project);
    Project createProject(ProjectRequestDto projectRequestDto);
    void deleteProject(int id);
    void removeTechnologyFromAllProjects(Technology technology);
    ProjectResponseDto toProjectResponseDto(Project project);
    List<ProjectResponseDto> getProjectsForUser(String email);
}
