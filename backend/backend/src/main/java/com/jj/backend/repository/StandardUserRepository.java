package com.jj.backend.repository;

import com.jj.backend.entity.StandardUser;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface StandardUserRepository extends JpaRepository<StandardUser, Integer> {
    Optional<StandardUser> findByEmail(String email);
    Optional<StandardUser> findStandardUserById(Integer id);
    boolean existsByEmail(String name);
}
