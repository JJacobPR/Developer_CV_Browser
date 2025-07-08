package com.jj.backend.service.service;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.dto.StandardUserCreateResponseDto;
import com.jj.backend.dto.StandardUserFullResponseDto;
import com.jj.backend.dto.StandardUserRequestDto;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.pagination.PaginationRequest;
import com.jj.backend.pagination.PagingResult;

import java.util.List;
import java.util.Optional;

public interface UserService {

    // Create, Update, Delete
    UserEntity createStandardUser(StandardUserRequestDto dto);
    UserEntity updateStandardUser(StandardUserRequestDto dto, Integer id);
    void deleteUser(Integer id);
    UserEntity saveUser(UserEntity user);

    // Read / Find
    Optional<UserEntity> getUserByEmail(String email);
    StandardUser findById(Integer userId);

    StandardUser findByEmail(String email);

    StandardUserFullResponseDto getDtoByEmail(String email);

    PagingResult<StandardUser> findAll(PaginationRequest request);
    List<RoleName> getRolesByEmail(String email);

    // Mapping / DTO conversions
    List<StandardUserFullResponseDto> mapToFullUserDtos(List<StandardUser> users);
    StandardUserCreateResponseDto toStandardUserResponseDto(UserEntity user);

    // Authentication / Response building
    LoginResponseDto buildResponse(UserEntity user, String token);
}