package com.jj.backend.service.service;

import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;

public interface ProjectService {
    void getAllProjects();
    void createProject(Project project);
    void updateProject(Project project);
    void deleteProject(int id);
    void removeTechnologyFromAllProjects(Technology technology);
}
