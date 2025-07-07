package com.jj.backend.service.service;

import com.jj.backend.dto.ProjectRequestDto;
import com.jj.backend.dto.ProjectResponseDto;
import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface ProjectService {

    // Read
    List<ProjectResponseDto> getAllProjects();
    List<ProjectResponseDto> getProjectsForUser(String email);
    ProjectResponseDto toProjectResponseDto(Project project);

    // Create / Save
    Project createProject(ProjectRequestDto projectRequestDto);
    Project saveProject(Project project);

    // Update
    Project updateProjectUser(Integer projectId, ProjectRequestDto dto, String role, String email);
    Project updateProjectAdmin(Integer projectId, ProjectRequestDto dto, String oldRole);

    // Delete
    void deleteProjectUser(Integer projectId, String userEmail);
    void deleteProjectAdmin(Integer projectId);

    // Utility
    void removeTechnologyFromAllProjects(Technology technology);
}