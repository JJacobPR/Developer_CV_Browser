package com.jj.backend.service.service;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserEntityService {

    List<UserEntity> getAllUsers();

    List<RoleName>getRolesByEmail(String email);

    Optional<UserEntity> getUserById(Integer id);

    Optional<UserEntity> getUserByEmail(String email);

    UserEntity createUser(UserEntity user);

    UserEntity updateUser(UserEntity user);

    void deleteUser(Integer id);

    boolean existsByEmail(String email);

    LoginResponseDto buildResponse(UserEntity user, String token);
}
