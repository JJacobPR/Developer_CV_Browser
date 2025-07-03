package com.jj.backend.rest;

import com.jj.backend.dto.LoginRequestDto;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.security.TokenGenerator;
import com.jj.backend.service.service.UserEntityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserEntityService userEntityService;
    private final AuthenticationManager authenticationManager;
    private final TokenGenerator tokenGenerator;

    public AuthController(UserEntityService userEntityService, AuthenticationManager authenticationManager, TokenGenerator tokenGenerator) {
        this.userEntityService = userEntityService;
        this.authenticationManager = authenticationManager;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<? extends LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Optional<UserEntity> optionalUser = userEntityService.getUserByEmail(loginRequestDto.getEmail());

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            UserEntity user = optionalUser.get();
            String token = tokenGenerator.generateToken(authentication);

            LoginResponseDto response = userEntityService.buildResponse(user, token);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (UsernameNotFoundException | IllegalStateException ex) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
