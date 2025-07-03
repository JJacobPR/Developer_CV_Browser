package com.jj.backend.service.impl;

import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;
import com.jj.backend.repository.ProjectRepository;
import com.jj.backend.service.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public void getAllProjects() {

    }

    @Override
    public void createProject(Project project) {

    }

    @Override
    public void updateProject(Project project) {

    }

    @Override
    public void deleteProject(int id) {

    }

    @Override
    public void removeTechnologyFromAllProjects(Technology technology) {
        List<Project> projects = projectRepository.findAllByTechnologiesContaining(technology);
        for (Project project : projects) {
            project.getTechnologies().remove(technology);
        }
        projectRepository.saveAll(projects);
    }
}
