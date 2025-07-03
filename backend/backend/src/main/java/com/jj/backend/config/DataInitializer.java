package com.jj.backend.config;

import com.jj.backend.entity.Role;
import com.jj.backend.entity.StandardUser;
import com.jj.backend.entity.UserEntity;
import com.jj.backend.repository.RoleRepository;
import com.jj.backend.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static com.jj.backend.config.RoleName.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.user.email}")
    private String userEmail;

    @Value("${app.user.password}")
    private String userPassword;

    private final RoleRepository roleRepository;
    private final UserEntityRepository userEntityRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserEntityRepository userEntityRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userEntityRepository = userEntityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void run(String... args) {
        List<RoleName> roleNames = List.of(ADMIN, USER, GUEST);

        for (RoleName roleName : roleNames) {
            roleRepository.findByRoleName(roleName)
                    .orElseGet(() -> roleRepository.save(new Role(roleName)));
        }

        List<Role> allRoles = roleRepository.findAll();
        List<Role> userRole = Collections.singletonList(new Role(USER));

        if (!userEntityRepository.existsByEmail(adminEmail)) {
            UserEntity admin = UserEntity.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .roles(allRoles).build();

            userEntityRepository.save(admin);
        }

        if (!userEntityRepository.existsByEmail(userEmail)) {
            StandardUser standardUser = StandardUser.builder()
                    .email(userEmail)
                    .password(passwordEncoder.encode(userPassword))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .roles(userRole)
                    .name("John")
                    .surname("Doe")
                    .phoneNumber("123456789")
                    .workRole("Backend Developer")
                    .bio("Experienced backend developer.")
                    .build();

            userEntityRepository.save(standardUser);
        }
    }
}
