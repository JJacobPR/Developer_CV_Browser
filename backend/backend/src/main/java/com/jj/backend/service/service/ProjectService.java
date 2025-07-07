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
    Project updateProjectUser(Integer projectId, ProjectRequestDto dto, String role, String email);
    Project updateProjectAdmin(Integer projectId, ProjectRequestDto dto, String oldRole);
    void deleteProjectUser(Integer projectId, String userEmail);
    void deleteProjectAdmin(Integer projectId);
    void removeTechnologyFromAllProjects(Technology technology);
    ProjectResponseDto toProjectResponseDto(Project project);
    List<ProjectResponseDto> getProjectsForUser(String email);
}
