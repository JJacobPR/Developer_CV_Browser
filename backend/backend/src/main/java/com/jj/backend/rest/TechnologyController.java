package com.jj.backend.rest;

import com.jj.backend.dto.TechnologyRequestDto;
import com.jj.backend.dto.TechnologyResponseDto;
import com.jj.backend.service.service.TechnologyService;
import com.jj.backend.entity.Technology;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/technology")
@RestController
public class TechnologyController {

    private final TechnologyService technologyService;

    public TechnologyController(TechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    @Operation(summary = "Get all technologies",
            description = "Returns a list of all available technologies. Accessible by ADMIN and USER roles.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TechnologyResponseDto>> getAllTechnologies() {
        List<Technology> technologies = technologyService.getTechnologies();
        List<TechnologyResponseDto> technologyResponseDtos = technologyService.toDtoList(technologies);
        return ResponseEntity.ok(technologyResponseDtos);
    }


    @Operation(
            summary = "Get all technologies by user ID",
            description = "Returns a list of all technologies associated with the specified user. Accessible by ADMIN and USER roles.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
            @ApiResponse(responseCode = "400", description = "Invalid user ID or user not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getAllTechnologiesByUser(@RequestParam int id) {
        try {
            List<Technology> technologies = technologyService.getTechnologiesByUser(id);
            List<TechnologyResponseDto> technologyResponseDtos = technologyService.toDtoList(technologies);
            return ResponseEntity.ok(technologyResponseDtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Operation(summary = "Add a new technology",
            description = "Creates a new technology. Only accessible by ADMIN. Possible types: FRONTEND, BACKEND, DEVOPS, DATABASE.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Technology created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or duplicate name"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTechnology(@RequestBody TechnologyRequestDto dto) {
        try {
            Technology technology = technologyService.buildTechnology(dto);
            Technology createdTech = technologyService.saveTechnology(technology);
            TechnologyResponseDto technologyResponseDto = technologyService.toDto(createdTech);
            return ResponseEntity.ok(technologyResponseDto);
        } catch (IllegalArgumentException e) {
            // Handle duplicate name or invalid input
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Operation(summary = "Update an existing technology",
            description = "Updates a technology by ID. Only accessible by ADMIN. Possible types: FRONTEND, BACKEND, DEVOPS, DATABASE.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Technology updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or name conflict"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTechnology(@PathVariable int id, @RequestBody TechnologyRequestDto dto) {
        try {
            Technology updatedTech = technologyService.updateTechnology(id, dto);
            TechnologyResponseDto technologyResponseDto = technologyService.toDto(updatedTech);
            return ResponseEntity.ok(technologyResponseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Operation(summary = "Delete a technology",
            description = "Deletes a technology by ID. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Technology deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Technology not found")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTechnology(@PathVariable int id) {
        technologyService.deleteTechnology(id);
        return ResponseEntity.noContent().build();
    }

}
