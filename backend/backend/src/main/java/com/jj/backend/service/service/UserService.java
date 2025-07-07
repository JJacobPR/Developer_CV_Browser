package com.jj.backend.service.service;

import com.jj.backend.config.RoleName;
import com.jj.backend.dto.LoginResponseDto;
import com.jj.backend.dto.StandardUserCreateResponseDto;
import com.jj.backend.dto.StandardUserFullResponseDto;
import com.jj.backend.dto.StandardUserRequestDto;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {


    List<StandardUser> getAllStandardUsers();

    List<StandardUserFullResponseDto> mapToFullUserDtos(List<StandardUser> users);

    List<RoleName>getRolesByEmail(String email);
    Optional<UserEntity> getUserByEmail(String email);
    UserEntity saveUser(UserEntity user);
    UserEntity createStandardUser(StandardUserRequestDto dto);
    UserEntity updateStandardUser(StandardUserRequestDto dto, Integer id);
    void deleteUser(Integer id);
    LoginResponseDto buildResponse(UserEntity user, String token);
    StandardUserCreateResponseDto toStandardUserResponseDto(UserEntity user);
    StandardUser findById(Integer userId);
    StandardUser findByEmail(String email);
}
