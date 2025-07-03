package com.jj.backend.service.impl;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.dto.StandardUserLoginResponseDto;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.repository.StandardUserRepository;
import com.jj.backend.repository.UserEntityRepository;
import com.jj.backend.service.service.UserEntityService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jj.backend.config.RoleName.*;

@Service
public class UserEntityServiceImpl implements UserEntityService {

    private final UserEntityRepository userEntityRepository;
    private final StandardUserRepository standardUserRepository;

    public UserEntityServiceImpl(UserEntityRepository userEntityRepository, StandardUserRepository standardUserRepository) {
        this.userEntityRepository = userEntityRepository;
        this.standardUserRepository = standardUserRepository;
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
    public Optional<UserEntity> getUserById(Integer id) {
        return userEntityRepository.findById(id);
    }

    @Override
    public Optional<UserEntity> getUserByEmail(String email) {
        return userEntityRepository.findUserEntityByEmail(email);
    }

    @Override
    public UserEntity createUser(UserEntity user) {
        return userEntityRepository.save(user);
    }

    @Override
    public UserEntity updateUser(UserEntity user) {
        return userEntityRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        userEntityRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userEntityRepository.existsByEmail(email);
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



    private LoginResponseDto buildAdminResponse(UserEntity user, String token, List<RoleName> roles) {
        LoginResponseDto dto = new LoginResponseDto();
        fillCommonUserFields(dto, user, token, roles);
        return dto;
    }

    private StandardUserLoginResponseDto buildUserResponse(UserEntity user, String token, List<RoleName> roles) {
        StandardUser standardUser = standardUserRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Client not found"));

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

        // Prioritize ADMIN role if present
        RoleName role = roles.contains(ADMIN) ? ADMIN : roles.getFirst();
        dto.setRole(role.toString());
    }
}
