package com.jj.backend.service.impl;

import com.jj.backend.config.TechnologyType;
import com.jj.backend.dto.TechnologyRequestDto;
import com.jj.backend.dto.TechnologyResponseDto;
import com.jj.backend.entity.Technology;
import com.jj.backend.error.ResourceNotFoundException;
import com.jj.backend.repository.StandardUserRepository;
import com.jj.backend.repository.TechnologyRepository;
import com.jj.backend.repository.UserProjectRepository;
import com.jj.backend.service.service.ProjectService;
import com.jj.backend.service.service.TechnologyService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechnologyServiceImpl implements TechnologyService {

    private final TechnologyRepository technologyRepository;
    @Lazy
    private final ProjectService projectService;
    private final UserProjectRepository userProjectRepository;
    private final StandardUserRepository standardUserRepository;

    public TechnologyServiceImpl(TechnologyRepository technologyRepository,@Lazy ProjectService projectService, UserProjectRepository userProjectRepository, StandardUserRepository standardUserRepository) {
        this.technologyRepository = technologyRepository;
        this.projectService = projectService;
        this.userProjectRepository = userProjectRepository;
        this.standardUserRepository = standardUserRepository;
    }

    @Override
    public List<Technology> getTechnologies() {
        return technologyRepository.findAll();
    }


    @Override
    public List<Technology> getTechnologiesByUser(Integer userId) {
        boolean userExists = standardUserRepository.existsById(userId);
        if (!userExists) {
            throw new IllegalArgumentException("User with id " + userId + " does not exist.");
        }
        return userProjectRepository.findTechnologiesByUserId(userId);
    }


    @Override
    public Technology saveTechnology(Technology technology) {
        return technologyRepository.save(technology);
    }

    @Override
    public Technology buildTechnology(TechnologyRequestDto technologyRequestDto) {
        String name = technologyRequestDto.getName();

        if (technologyRepository.existsByName(name)) {
            throw new IllegalArgumentException("Technology with name '" + name + "' already exists.");
        }

        LocalDateTime now = LocalDateTime.now();

        return Technology.builder()
                .name(name)
                .type(technologyRequestDto.getType())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    @Override
    public Technology updateTechnology(Integer technologyId, TechnologyRequestDto dto) {
        Technology existingTech = technologyRepository.findById(technologyId)
                .orElseThrow(() -> new IllegalArgumentException("Technology with ID " + technologyId + " not found"));

        if (technologyRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Technology with name '" + dto.getName() + "' already exists.");
        }

        existingTech.setName(dto.getName());
        existingTech.setType(dto.getType());
        existingTech.setUpdatedAt(LocalDateTime.now());

        return saveTechnology(existingTech);
    }

    @Override
    public void deleteTechnology(Integer id) {
        Technology technology = technologyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Technology not found"));

        projectService.removeTechnologyFromAllProjects(technology);

        technologyRepository.delete(technology);
    }


    @Override
    public List<TechnologyResponseDto> toDtoList(List<Technology> technologies) {
        if (technologies == null) {
            return Collections.emptyList();
        }
        return technologies.stream()
                .map(t -> new TechnologyResponseDto(
                        t.getId(),
                        t.getName(),
                        t.getType(),
                        t.getCreatedAt(),
                        t.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public TechnologyResponseDto toTechnologyDto(Technology technology) {
        if (technology == null) {
            return null;
        }
        return new TechnologyResponseDto(
                technology.getId(),
                technology.getName(),
                technology.getType(),
                technology.getCreatedAt(),
                technology.getUpdatedAt()
        );
    }

    @Override
    public List<Technology> findAllById(List<Integer> technologies) {
        return technologyRepository.findAllById(technologies);
    }

}
