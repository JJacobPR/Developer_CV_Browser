package com.jj.backend.service.impl;

import com.jj.backend.config.TechnologyType;
import com.jj.backend.entity.Technology;
import com.jj.backend.error.ResourceNotFoundException;
import com.jj.backend.repository.TechnologyRepository;
import com.jj.backend.service.service.ProjectService;
import com.jj.backend.service.service.TechnologyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyServiceImpl implements TechnologyService {

    private final TechnologyRepository technologyRepository;
    private final ProjectService projectService;

    public TechnologyServiceImpl(TechnologyRepository technologyRepository, ProjectService projectService) {
        this.technologyRepository = technologyRepository;
        this.projectService = projectService;
    }

    @Override
    public List<Technology> getTechnologies() {
        return technologyRepository.findAll();
    }

    @Override
    public List<Technology> getTechnologiesByType(TechnologyType technologyType) {
        return technologyRepository.findAllByType(technologyType);
    }

    @Override
    public Technology getTechnology(int id) {
        return technologyRepository.findTechnologyById(id);
    }

    @Override
    public Technology createTechnology(Technology technology) {
        return technologyRepository.save(technology);
    }

    @Override
    public Technology updateTechnology(Technology technology) {
        return technologyRepository.save(technology);
    }

    @Override
    public void deleteTechnology(int id) {
        Technology technology = technologyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Technology not found"));

        projectService.removeTechnologyFromAllProjects(technology);

        technologyRepository.delete(technology);
    }
}
