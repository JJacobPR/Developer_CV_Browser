package com.jj.backend.rest;

import com.jj.backend.dto.ProjectRequestDto;
import com.jj.backend.dto.ProjectResponseDto;
import com.jj.backend.entity.Project;
import com.jj.backend.service.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Get all projects",
            description = "Returns a list of all projects with user and technology details. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Projects retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<List<ProjectResponseDto>> getAllProjects() {
        List<ProjectResponseDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/my-projects")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Get projects for the logged-in user",
            description = "Returns a list of projects associated with the authenticated user. Only accessible by ADMIN and USER.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Projects retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<List<ProjectResponseDto>> getMyProjects(Principal principal) {
        String email = principal.getName();
        List<ProjectResponseDto> projects = projectService.getProjectsForUser(email);
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Create a new project for a user",
            description = "Creates a new project and links it to the given user. Only accessible by ADMIN and USER.",
            security = @SecurityRequirement(name = "bearerAuth")
    )

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Project created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request - user or technologies not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<ProjectResponseDto> createProject(@RequestBody ProjectRequestDto projectDto) {
        Project createdProject = projectService.createProject(projectDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.toProjectResponseDto(createdProject));
    }

    @PutMapping("/admin/{projectId}/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Update a user's role or project data",
            description = "Allows an admin to update project details and a specific user's role in the project. " +
                    "The user's old role must be provided in the path. If the user-role combination does not exist, a new relation is created. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request or role conflict"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "404", description = "Project or user-project relation not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<ProjectResponseDto> updateProjectAdmin(
            @PathVariable Integer projectId,
            @PathVariable String role,
            @RequestBody ProjectRequestDto dto) {
        Project updatedProject = projectService.updateProjectAdmin(projectId, dto, role);
        return ResponseEntity.ok().body(projectService.toProjectResponseDto(updatedProject));
    }


    @PutMapping("/{projectId}/{role}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Update own role or project data",
            description = "Allows a user to update their own project details and role in a specific project. " +
                    "The user's current role must be included in the path. Only accessible by ADMIN and USER.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data or role conflict"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "404", description = "Project or user-project relation not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<ProjectResponseDto> updateProjectUser(
            @PathVariable Integer projectId,
            @PathVariable String role,
            @RequestBody ProjectRequestDto dto,
            Principal principal) {
        String email = principal.getName();
        Project updatedProject = projectService.updateProjectUser(projectId, dto, role, email);
        return ResponseEntity.ok().body(projectService.toProjectResponseDto(updatedProject));

    }


    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Delete a project for the current user",
            description = "Allows a user to delete their own project. Only deletes the project if no other users are assigned. Only accessible by ADMIN and USER.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Project deleted or user unassigned"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: not own project"),
            @ApiResponse(responseCode = "404", description = "Project or user-project not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<Void> deleteUserProject(@PathVariable Integer projectId, Principal principal) {
        String email = principal.getName();
        projectService.deleteProjectUser(projectId, email);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/admin/{projectId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Delete a project",
            description = "Allows an admin to delete a project. Only deletes the project if no other users are assigned. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Project deleted or user unassigned"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden: not authorized to delete this project"),
            @ApiResponse(responseCode = "404", description = "Project or user-project not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<Void> deleteAdminProject(@PathVariable Integer projectId) {
        projectService.deleteProjectAdmin(projectId);
        return ResponseEntity.noContent().build();
    }

}
