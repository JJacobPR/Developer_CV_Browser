package com.jj.backend.service.impl;

import com.jj.backend.dto.ProjectRequestDto;
import com.jj.backend.dto.ProjectResponseDto;
import com.jj.backend.dto.StandardUserProjectResponseDto;
import com.jj.backend.dto.TechnologyResponseDto;
import com.jj.backend.entity.*;
import com.jj.backend.error.ResourceNotFoundException;
import com.jj.backend.repository.ProjectRepository;
import com.jj.backend.repository.StandardUserRepository;
import com.jj.backend.repository.UserProjectRepository;
import com.jj.backend.service.service.ProjectService;
import com.jj.backend.service.service.TechnologyService;
import com.jj.backend.service.service.UserService;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final TechnologyService technologyService;
    private final UserProjectRepository userProjectRepository;
    private final StandardUserRepository standardUserRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserService userService, TechnologyService technologyService, UserProjectRepository userProjectRepository, StandardUserRepository standardUserRepository) {
        this.projectRepository = projectRepository;
        this.userService = userService;
        this.technologyService = technologyService;
        this.userProjectRepository = userProjectRepository;
        this.standardUserRepository = standardUserRepository;
    }

    @Override
    public List<ProjectResponseDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();

        return projects.stream()
                .map(this::toProjectResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Project saveProject(Project project) {
        return null;
    }

    @Override
    public Project createProject(ProjectRequestDto projectRequestDto) {
        // Fetch the user by ID
        StandardUser user = userService.findById(projectRequestDto.getUserId());

        // Fetch the technologies by ID list
        List<Technology> technologies = technologyService.findAllById(projectRequestDto.getTechnologies());

        if (technologies.size() != projectRequestDto.getTechnologies().size()) {
            throw new IllegalArgumentException("Some technology IDs are invalid.");
        }

        LocalDateTime now = LocalDateTime.now();

        // Create the project
        Project project = Project.builder()
                .name(projectRequestDto.getName())
                .companyName(projectRequestDto.getCompanyName())
                .description(projectRequestDto.getDescription())
                .startDate(projectRequestDto.getStartDate())
                .endDate(projectRequestDto.getEndDate())
                .technologies(technologies)
                .createdAt(now)
                .updatedAt(now)
                .build();

        // Save project
        Project savedProject = saveProject(project);

        // Create UserProject relationship
        UserProject userProject = UserProject.builder()
                .project(savedProject)
                .standardUser(user)
                .projectRole(projectRequestDto.getProjectRole())
                .createdAt(now)
                .updatedAt(now)
                .build();

        userProjectRepository.save(userProject);

        savedProject.getUsers().add(userProject);
        user.getProjects().add(userProject);

        return savedProject;
    }

    @Override
    public void deleteProjectUser(Integer projectId, String userEmail) {
        StandardUser user = standardUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        UserProject userProject = userProjectRepository.findByStandardUserAndProject(user, project)
                .orElseThrow(() -> new IllegalStateException("You are not assigned to this project"));


        // Count how many users are assigned
        long count = userProjectRepository.countByProject(project);

        if (count == 1) {
            projectRepository.delete(project);
        } else {
            // Other users exist — just remove this user's relation
            userProjectRepository.delete(userProject);
        }
    }


    @Override
    public void removeTechnologyFromAllProjects(Technology technology) {
        List<Project> projects = projectRepository.findAllByTechnologiesContaining(technology);
        for (Project project : projects) {
            project.getTechnologies().remove(technology);
        }
        projectRepository.saveAll(projects);
    }

    public ProjectResponseDto toProjectResponseDto(Project project) {
        ProjectResponseDto dto = new ProjectResponseDto();
        dto.setProjectId(project.getId());
        dto.setName(project.getName());
        dto.setCompanyName(project.getCompanyName());
        dto.setDescription(project.getDescription());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setCreateAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());

        List<StandardUserProjectResponseDto> userDtos = project.getUsers().stream()
                .map(userProject -> {
                    StandardUser user = userProject.getStandardUser();

                    StandardUserProjectResponseDto userDto = new StandardUserProjectResponseDto();
                    userDto.setId(user.getId());
                    userDto.setEmail(user.getEmail());
                    userDto.setName(user.getName());
                    userDto.setSurname(user.getSurname());
                    userDto.setPhoneNumber(user.getPhoneNumber());
                    userDto.setWorkRole(user.getWorkRole());
                    userDto.setBio(user.getBio());
                    userDto.setProjectRole(userProject.getProjectRole());

                    return userDto;
                })
                .collect(Collectors.toList());

        dto.setUsers(userDtos);

        // Map technologies
        List<TechnologyResponseDto> techDtos = project.getTechnologies().stream()
                .map(technologyService::toTechnologyDto)
                .collect(Collectors.toList());
        dto.setTechnologies(techDtos);

        return dto;
    }

    public List<ProjectResponseDto> getProjectsForUser(String email) {
        StandardUser user = userService.findByEmail(email);

        List<Project> projects = user.getProjects().stream()
                .map(UserProject::getProject)
                .distinct()
                .toList();

        return projects.stream()
                .map(this::toProjectResponseDto)
                .collect(Collectors.toList());
    }

}
