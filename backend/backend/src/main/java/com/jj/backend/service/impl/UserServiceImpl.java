package com.jj.backend.service.impl;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.*;
import com.jj.backend.entity.Role;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.repository.RoleRepository;
import com.jj.backend.repository.StandardUserRepository;
import com.jj.backend.repository.UserEntityRepository;
import com.jj.backend.repository.UserProjectRepository;
import com.jj.backend.service.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jj.backend.config.RoleName.*;

@Service
public class UserServiceImpl implements UserService {

    @Value("${app.admin.email}")
    private String adminEmail;

    private final UserEntityRepository userEntityRepository;
    private final StandardUserRepository standardUserRepository;
    private final UserProjectRepository userProjectRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserEntityRepository userEntityRepository, StandardUserRepository standardUserRepository, UserProjectRepository userProjectRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userEntityRepository = userEntityRepository;
        this.standardUserRepository = standardUserRepository;
        this.userProjectRepository = userProjectRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userEntityRepository.findAll();
    }

    @Override
    public List<RoleName> getRolesByEmail(String email) {
        List<String> roleStrings = userEntityRepository.findRolesByEmail(email);
        // Map roles (Strings) to RoleName enum
        return roleStrings.stream()
                .map(RoleName::valueOf)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserEntity> getUserByEmail(String email) {
        return userEntityRepository.findUserEntityByEmail(email);
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userEntityRepository.save(user);
    }

    @Override
    public UserEntity createStandardUser(StandardUserRequestDto dto) {
        if (userEntityRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("User with email " + dto.getEmail() + " already exists.");
        }

        Role userRole = roleRepository.findByRoleName(USER)
                .orElseThrow(() -> new RuntimeException("USER role not found"));
        List<Role> userRoles = Collections.singletonList(userRole);

        StandardUser user = StandardUser.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .surname(dto.getSurname())
                .phoneNumber(dto.getPhoneNumber())
                .workRole(dto.getWorkRole())
                .bio(dto.getBio())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .roles(userRoles)
                .build();

        return (standardUserRepository.save(user));
    }

    @Override
    public UserEntity updateStandardUser(StandardUserRequestDto dto, Integer userId) {
        StandardUser existingUser = standardUserRepository.findStandardUserById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

        if (standardUserRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("User with email " + dto.getEmail() + " already exists.");
        }

        if (isRootAdmin(existingUser.getEmail())) {
            throw new IllegalStateException("Cannot modify root admin");
        }

        existingUser.setEmail(dto.getEmail());
        existingUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        existingUser.setName(dto.getName());
        existingUser.setSurname(dto.getSurname());
        existingUser.setPhoneNumber(dto.getPhoneNumber());
        existingUser.setWorkRole(dto.getWorkRole());
        existingUser.setBio(dto.getBio());
        existingUser.setUpdatedAt(LocalDateTime.now());

        return saveUser(existingUser);
    }

    @Override
    public void deleteUser(Integer userId) {
        UserEntity user = userEntityRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (isRootAdmin(user.getEmail())) {
            throw new IllegalStateException("Cannot delete root admin");
        }

        // Delete all UserProject relations
        userProjectRepository.deleteByStandardUserId(userId);

        userEntityRepository.delete(user);
    }

    @Override
    public LoginResponseDto buildResponse(UserEntity user, String token) {
        List<RoleName> roles = getRolesByEmail(user.getEmail());
        if (roles.contains(ADMIN)) {
            return buildAdminResponse(user, token, roles);
        } else if (roles.contains(USER)) {
            return buildUserResponse(user, token, roles);
        }

        throw new IllegalStateException("Unsupported role");
    }

    @Override
    public StandardUserCreateResponseDto toStandardUserResponseDto(UserEntity user) {
        StandardUser standardUser = standardUserRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        StandardUserCreateResponseDto dto = new StandardUserCreateResponseDto();

        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        dto.setName(standardUser.getName());
        dto.setSurname(standardUser.getSurname());
        dto.setPhoneNumber(standardUser.getPhoneNumber());
        dto.setWorkRole(standardUser.getWorkRole());
        dto.setBio(standardUser.getBio());

        dto.setRole(RoleName.USER.toString());

        return dto;
    }

    @Override
    public StandardUser findById(Integer userId) {
        return standardUserRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public StandardUser findByEmail(String email) {
        return standardUserRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private LoginResponseDto buildAdminResponse(UserEntity user, String token, List<RoleName> roles) {
        LoginResponseDto dto = new LoginResponseDto();
        fillCommonUserFields(dto, user, token, roles);
        return dto;
    }

    private StandardUserLoginResponseDto buildUserResponse(UserEntity user, String token, List<RoleName> roles) {
        StandardUser standardUser = standardUserRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        StandardUserLoginResponseDto dto = new StandardUserLoginResponseDto();
        fillCommonUserFields(dto, user, token, roles);
        dto.setName(standardUser.getName());
        dto.setSurname(standardUser.getSurname());
        dto.setPhoneNumber(standardUser.getPhoneNumber());
        dto.setWorkRole(standardUser.getWorkRole());
        dto.setBio(standardUser.getBio());
        return dto;
    }

    private void fillCommonUserFields(LoginResponseDto dto, UserEntity user, String token, List<RoleName> roles) {
        dto.setEmail(user.getEmail());
        dto.setId(user.getId());
        dto.setToken(token);
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        // Prioritize ADMIN role if present
        RoleName role = roles.contains(ADMIN) ? ADMIN : roles.getFirst();
        dto.setRole(role.toString());
    }


    private boolean isRootAdmin(String email) {
        return adminEmail.equalsIgnoreCase(email);
    }
}
