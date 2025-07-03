package com.jj.backend.repository;

import com.jj.backend.entity.Project;
import com.jj.backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findAllByTechnologiesContaining(Technology technology);
}
