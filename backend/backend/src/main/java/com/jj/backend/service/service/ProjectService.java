package com.jj.backend.service.service;

import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project saveProject(Project project);
    void deleteProject(int id);
    void removeTechnologyFromAllProjects(Technology technology);
}
