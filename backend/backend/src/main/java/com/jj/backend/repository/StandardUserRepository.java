package com.jj.backend.repository;

import com.jj.backend.entity.StandardUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StandardUserRepository extends JpaRepository<StandardUser, Integer> {
    Optional<StandardUser> findByEmail(String email);
}
