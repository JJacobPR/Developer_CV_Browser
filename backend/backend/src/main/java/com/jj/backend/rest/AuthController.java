package com.jj.backend.rest;

import com.jj.backend.dto.LoginRequestDto;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.security.TokenGenerator;
import com.jj.backend.service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenGenerator tokenGenerator;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, TokenGenerator tokenGenerator) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenGenerator = tokenGenerator;
    }

    @Operation(
            summary = "Authenticate user and generate JWT token",
            description = "Accepts user credentials (email and password) and returns a JWT token if authentication is successful."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication successful, JWT token returned"),
            @ApiResponse(responseCode = "400", description = "Bad request, invalid input or username not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized, invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<? extends LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Optional<UserEntity> optionalUser = userService.getUserByEmail(loginRequestDto.getEmail());

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            UserEntity user = optionalUser.get();
            String token = tokenGenerator.generateToken(authentication);

            LoginResponseDto response = userService.buildResponse(user, token);

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (UsernameNotFoundException | IllegalStateException ex) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @Operation(
            summary = "Refresh token using existing valid JWT",
            description = "Takes a valid JWT token, extracts user info, and returns the same token and user data."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token is valid, user info returned"),
            @ApiResponse(responseCode = "401", description = "Invalid or expired token"),
    })
    @GetMapping("/refresh")
    public ResponseEntity<? extends LoginResponseDto> refreshToken(HttpServletRequest request, Principal principal) {
        try {
            String header = request.getHeader("Authorization");

            if (header == null || !header.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String token = header.substring(7); // Remove "Bearer "

            // Extract email from token
            String email = principal.getName();
            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Optional<UserEntity> optionalUser = userService.getUserByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            UserEntity user = optionalUser.get();

            LoginResponseDto response = userService.buildResponse(user, token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
