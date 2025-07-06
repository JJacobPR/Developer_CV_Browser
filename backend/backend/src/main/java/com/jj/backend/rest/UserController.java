package com.jj.backend.rest;

import com.jj.backend.dto.StandardUserRequestDto;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Create a new standard user",
            description = "Allows an admin to create a new standard user with provided details. " +
                    "Returns 400 if a user with the given email already exists, " +
                    "or 500 if an unexpected server error occurs.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Standard user created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request: User with the given email already exists or invalid input"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Requires ADMIN role"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addStandardUser(@RequestBody StandardUserRequestDto dto) {
        try {
            UserEntity createdUser = userService.createStandardUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.toStandardUserResponseDto(createdUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    @Operation(
            summary = "Update a standard user by ID",
            description = "Allows an admin to update the details of an existing standard user. " +
                    "Returns 400 if input is invalid, 404 if the user is not found, " +
                    "or 500 if an unexpected server error occurs.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request: Invalid input"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Requires ADMIN role"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStandardUser(@PathVariable Integer id, @RequestBody StandardUserRequestDto dto) {
        try {
            UserEntity updatedUser = userService.updateStandardUser(dto, id);
            return ResponseEntity.ok(userService.toStandardUserResponseDto(updatedUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    @Operation(
            summary = "Delete a user by ID",
            description = "Allows an admin to delete a user. Root admin user cannot be deleted.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Forbidden: Attempt to delete root admin user or access denied"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

}
