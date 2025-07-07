package com.jj.backend.config;

import com.jj.backend.entity.*;
import com.jj.backend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import java.util.stream.Collectors;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.user.password}")
    private String userPassword;

    private final RoleRepository roleRepository;
    private final UserEntityRepository userEntityRepository;
    private final StandardUserRepository standardUserRepository;
    private final TechnologyRepository technologyRepository;
    private final ProjectRepository projectRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserEntityRepository userEntityRepository, StandardUserRepository standardUserRepository, PasswordEncoder passwordEncoder, TechnologyRepository technologyRepository, ProjectRepository projectRepository) {
        this.roleRepository = roleRepository;
        this.userEntityRepository = userEntityRepository;
        this.standardUserRepository = standardUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.technologyRepository = technologyRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    @Override
    public void run(String... args) {
        createRoles();

        if (userEntityRepository.count() == 0) {  // if no users exist
            createUsers();
            createTechnologies();
            createProjects();
            logger.info("Database seeded successfully");
        } else {
            logger.info("Users already exist, skipping seeding.");
        }
    }

    private void createRoles() {
        List<RoleName> roleNames = List.of(RoleName.ADMIN, RoleName.USER, RoleName.GUEST);
        for (RoleName roleName : roleNames) {
            roleRepository.findByRoleName(roleName)
                    .orElseGet(() -> roleRepository.save(new Role(roleName)));
        }
    }

    private void createUsers() {
        List<Role> allRoles = roleRepository.findAll();
        Role userRole = roleRepository.findByRoleName(RoleName.USER)
                .orElseThrow(() -> new RuntimeException("USER role not found"));
        List<Role> userRoles = Collections.singletonList(userRole);

        // Admin user (unchanged)
        if (!userEntityRepository.existsByEmail(adminEmail)) {
            UserEntity admin = UserEntity.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .roles(allRoles)
                    .build();
            userEntityRepository.save(admin);
        }

        // Additional 3 users, hardcoded emails & info
        List<StandardUser> users = List.of(
                StandardUser.builder()
                        .email("alice@example.com")
                        .password(passwordEncoder.encode(userPassword))
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .roles(userRoles)
                        .name("Alice")
                        .surname("Smith")
                        .phoneNumber("1112223333")
                        .workRole("Frontend Developer")
                        .bio("Passionate frontend engineer with React experience.")
                        .build(),

                StandardUser.builder()
                        .email("bob@example.com")
                        .password(passwordEncoder.encode(userPassword))
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .roles(userRoles)
                        .name("Bob")
                        .surname("Johnson")
                        .phoneNumber("4445556666")
                        .workRole("Fullstack Developer")
                        .bio("Skilled in both frontend and backend development.")
                        .build(),

                StandardUser.builder()
                        .email("carol@example.com")
                        .password(passwordEncoder.encode(userPassword))
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .roles(userRoles)
                        .name("Carol")
                        .surname("Williams")
                        .phoneNumber("7778889999")
                        .workRole("DevOps Engineer")
                        .bio("Experienced in cloud infrastructure and automation.")
                        .build()
        );

        for (StandardUser user : users) {
            if (!userEntityRepository.existsByEmail(user.getEmail())) {
                userEntityRepository.save(user);
            }
        }
    }

    private void createTechnologies() {
        if (technologyRepository.count() > 0) {
            return; // Already seeded
        }

        LocalDateTime now = LocalDateTime.now();

        List<Technology> technologies = List.of(
                // Frontend (10)
                Technology.builder().name("React").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 0
                Technology.builder().name("Angular").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 1
                Technology.builder().name("Vue.js").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 2
                Technology.builder().name("Svelte").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 3
                Technology.builder().name("Bootstrap").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 4
                Technology.builder().name("Ember.js").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 5
                Technology.builder().name("Backbone.js").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 6
                Technology.builder().name("jQuery").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 7
                Technology.builder().name("Lit").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 8
                Technology.builder().name("Alpine.js").type(TechnologyType.FRONTEND).createdAt(now).updatedAt(now).build(), // 9

                // Backend (10)
                Technology.builder().name("Spring Boot").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 10
                Technology.builder().name("Node.js").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 11
                Technology.builder().name("Django").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 12
                Technology.builder().name("Express").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 13
                Technology.builder().name("Ruby on Rails").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 14
                Technology.builder().name("Laravel").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 15
                Technology.builder().name("Flask").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 16
                Technology.builder().name("ASP.NET Core").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 17
                Technology.builder().name("Micronaut").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 18
                Technology.builder().name("Quarkus").type(TechnologyType.BACKEND).createdAt(now).updatedAt(now).build(), // 19

                // DevOps (5)
                Technology.builder().name("Docker").type(TechnologyType.DEVOPS).createdAt(now).updatedAt(now).build(), // 20
                Technology.builder().name("Kubernetes").type(TechnologyType.DEVOPS).createdAt(now).updatedAt(now).build(), // 21
                Technology.builder().name("Jenkins").type(TechnologyType.DEVOPS).createdAt(now).updatedAt(now).build(), // 22
                Technology.builder().name("Terraform").type(TechnologyType.DEVOPS).createdAt(now).updatedAt(now).build(), // 23
                Technology.builder().name("Ansible").type(TechnologyType.DEVOPS).createdAt(now).updatedAt(now).build(), // 24

                // Databases (5)
                Technology.builder().name("PostgreSQL").type(TechnologyType.DATABASE).createdAt(now).updatedAt(now).build(), // 25
                Technology.builder().name("MySQL").type(TechnologyType.DATABASE).createdAt(now).updatedAt(now).build(), // 26
                Technology.builder().name("MongoDB").type(TechnologyType.DATABASE).createdAt(now).updatedAt(now).build(), // 27
                Technology.builder().name("Redis").type(TechnologyType.DATABASE).createdAt(now).updatedAt(now).build(), // 28
                Technology.builder().name("Oracle").type(TechnologyType.DATABASE).createdAt(now).updatedAt(now).build() // 29
        );

        technologyRepository.saveAll(technologies);
    }


    @Transactional
    public void createProjects() {
        // Fetch users by email - replace emails with your actual emails used in createUsers()
        StandardUser user1 = standardUserRepository.findByEmail("alice@example.com")
                .orElseThrow(() -> new RuntimeException("alice@example.com not found"));
        StandardUser user2 = standardUserRepository.findByEmail("bob@example.com")
                .orElseThrow(() -> new RuntimeException("bob@example.com not found"));
        StandardUser user3 = standardUserRepository.findByEmail("carol@example.com")
                .orElseThrow(() -> new RuntimeException("carol@example.com not found"));

        LocalDateTime now = LocalDateTime.now();

        // Create projects for user1 (3 unique projects)
        Project projectA = Project.builder()
                .name("Project Alpha")
                .companyName("Company A")
                .description("First unique project for user1")
                .startDate(now.minusMonths(6))
                .endDate(now.plusMonths(6))
                .technologies(getTechnologiesByIndexes(0, 4, 11, 20, 27))
                .createdAt(now)
                .updatedAt(now)
                .build();

        Project projectB = Project.builder()
                .name("Project Beta")
                .companyName("Company B")
                .description("Second unique project for user1")
                .startDate(now.minusMonths(3))
                .endDate(now.plusMonths(3))
                .technologies(getTechnologiesByIndexes(2, 10, 20, 21, 26))
                .createdAt(now)
                .updatedAt(now)
                .build();

        Project projectC = Project.builder()
                .name("Project Gamma")
                .companyName("Company C")
                .description("Third unique project for user1")
                .startDate(now.minusMonths(1))
                .endDate(now.plusMonths(5))
                .technologies(getTechnologiesByIndexes(0, 4, 20, 21, 26))
                .createdAt(now)
                .updatedAt(now)
                .build();

        // Save projects first
        projectRepository.saveAll(List.of(projectA, projectB, projectC));

        // Assign projects to user1
        user1.getProjects().addAll(List.of(
                UserProject.builder()
                        .project(projectA)
                        .standardUser(user1)
                        .projectRole("Developer")
                        .createdAt(now)
                        .updatedAt(now)
                        .build(),
                UserProject.builder()
                        .project(projectB)
                        .standardUser(user1)
                        .projectRole("Lead Developer")
                        .createdAt(now)
                        .updatedAt(now)
                        .build(),
                UserProject.builder()
                        .project(projectC)
                        .standardUser(user1)
                        .projectRole("Architect")
                        .createdAt(now)
                        .updatedAt(now)
                        .build()
        ));

        // Similarly, create one unique project for user2
        Project projectD = Project.builder()
                .name("Project Delta")
                .companyName("Company D")
                .description("Unique project for user2")
                .startDate(now.minusMonths(4))
                .endDate(now.plusMonths(8))
                .technologies(getTechnologiesByIndexes(1,2 ,3, 10, 11, 12))
                .createdAt(now)
                .updatedAt(now)
                .build();
        projectRepository.save(projectD);

        user2.getProjects().add(
                UserProject.builder()
                        .project(projectD)
                        .standardUser(user2)
                        .projectRole("Developer")
                        .createdAt(now)
                        .updatedAt(now)
                        .build()
        );

        // And one unique project for user3
        Project projectE = Project.builder()
                .name("Project Epsilon")
                .companyName("Company E")
                .description("Unique project for user3")
                .startDate(now.minusMonths(2))
                .endDate(now.plusMonths(10))
                .technologies(getTechnologiesByIndexes(5, 12, 23,24,25,26))
                .createdAt(now)
                .updatedAt(now)
                .build();
        projectRepository.save(projectE);

        user3.getProjects().add(
                UserProject.builder()
                        .project(projectE)
                        .standardUser(user3)
                        .projectRole("Tester")
                        .createdAt(now)
                        .updatedAt(now)
                        .build()
        );


    }

    private List<Technology> getTechnologiesByIndexes(int... indexes) {
        List<Technology> allTechnologies = technologyRepository.findAll();

        return Arrays.stream(indexes)
                .filter(i -> i < allTechnologies.size())
                .mapToObj(allTechnologies::get)
                .collect(Collectors.toList());
    }
}

