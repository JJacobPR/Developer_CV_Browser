package com.jj.backend.repository;

import com.jj.backend.config.TechnologyType;
import com.jj.backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnologyRepository extends JpaRepository<Technology, Integer> {
    List<Technology> findAllByType(TechnologyType type);
    Technology findTechnologyById(int id);
}
