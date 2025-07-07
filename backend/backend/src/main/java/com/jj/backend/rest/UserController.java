package com.jj.backend.rest;

import com.jj.backend.dto.StandardUserCreateResponseDto;
import com.jj.backend.dto.StandardUserFullResponseDto;
import com.jj.backend.dto.StandardUserRequestDto;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.pagination.PaginationRequest;
import com.jj.backend.pagination.PagingResult;
import com.jj.backend.service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(
            summary = "Get all users with their full profile and project information",
            description = "Returns a list of all users including their personal info and associated projects",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    public ResponseEntity<List<StandardUserFullResponseDto>> getAllUsersWithProjects(@RequestParam(defaultValue = "0") int page,
                                                                                     @RequestParam(defaultValue = "10") int size,
                                                                                     @RequestParam(defaultValue = "id") String sortField,
                                                                                     @RequestParam(defaultValue = "DESC")Sort.Direction direction) {

        PaginationRequest paginationRequest = new PaginationRequest(page, size, sortField, direction);
        PagingResult<StandardUser> users = userService.findAll(paginationRequest);
        List<StandardUserFullResponseDto> dtos = userService.mapToFullUserDtos(users.getContent().stream().toList());
        return ResponseEntity.ok(dtos);
    }


    @Operation(
            summary = "Create a new standard user",
            description = "Allows an admin to create a new standard user with provided details. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Standard user created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request: User with the given email already exists or invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandardUserCreateResponseDto> addStandardUser(@RequestBody StandardUserRequestDto dto) {
            UserEntity createdUser = userService.createStandardUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.toStandardUserResponseDto(createdUser));
    }

    @Operation(
            summary = "Update a standard user by ID",
            description = "Allows an admin to update the details of an existing standard user. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request: Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandardUserCreateResponseDto> updateStandardUser(@PathVariable Integer id, @RequestBody StandardUserRequestDto dto) {
            UserEntity updatedUser = userService.updateStandardUser(dto, id);
            return ResponseEntity.ok(userService.toStandardUserResponseDto(updatedUser));
    }

    @Operation(
            summary = "Delete a user by ID",
            description = "Allows an admin to delete a user. Root admin user cannot be deleted. Only accessible by ADMIN.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid or missing token"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Invalid role"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "409", description = "Cannot delete root admin"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
