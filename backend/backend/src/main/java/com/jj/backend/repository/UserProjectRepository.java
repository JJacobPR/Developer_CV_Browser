package com.jj.backend.repository;

import com.jj.backend.entity.Project;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.Technology;
import com.jj.backend.entity.UserProject;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Integer> {
    @Query("""
    SELECT DISTINCT t FROM UserProject up
    JOIN up.project p
    JOIN p.technologies t
    WHERE up.standardUser.id = :userId
""")
    List<Technology> findTechnologiesByUserId(@Param("userId") int userId);
    @Modifying
    @Transactional
    @Query("DELETE FROM UserProject up WHERE up.standardUser.id = :userId")
    void deleteByStandardUserId(@Param("userId") int userId);
    Optional<UserProject> findByStandardUserAndProject(StandardUser user, Project project);
    int countByProject(Project project);
    Optional<UserProject> findByProjectIdAndStandardUserIdAndProjectRole(Integer projectId, Integer userId, String projectRole);
    boolean existsByProjectIdAndStandardUserIdAndProjectRole(Integer projectId, Integer userId, String projectRole);
}
