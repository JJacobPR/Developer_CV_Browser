package com.jj.backend.service.service;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.dto.StandardUserCreateRequestDto;
import com.jj.backend.dto.StandardUserCreateResponseDto;
import com.jj.backend.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserEntity> getAllUsers();
    List<RoleName>getRolesByEmail(String email);
    Optional<UserEntity> getUserById(Integer id);
    Optional<UserEntity> getUserByEmail(String email);
    UserEntity saveUser(UserEntity user);
    UserEntity createStandardUser(StandardUserCreateRequestDto dto);
    UserEntity updateStandardUser(StandardUserCreateRequestDto dto, Integer id);
    void deleteUser(Integer id);
    LoginResponseDto buildResponse(UserEntity user, String token);

    StandardUserCreateResponseDto toStandardUserCreateResponseDto(UserEntity user);
}
