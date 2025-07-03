package com.jj.backend.repository;

import com.jj.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findUserEntityByEmail(String email);
    @Query(value = "SELECT r.role_name FROM users u JOIN users_roles ur ON u.id = ur.user_id JOIN roles r ON r.id = ur.role_id WHERE u.email = :email", nativeQuery = true)
    List<String> findRolesByEmail(@Param("email") String email);
    Boolean existsByEmail(String email);
}
