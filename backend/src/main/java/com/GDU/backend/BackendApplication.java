package com.GDU.backend;

import com.GDU.backend.models.Role;
import com.GDU.backend.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // @Bean
    // public CommandLineRunner commendLineRunner(RoleRepository roleRepository) {
    //     return args -> {
    //         if (roleRepository.findByName("USER").isEmpty()) {
    //             Role role = Role.builder()
    //                     .name("USER")
    //                     .build();
    //             roleRepository.save(role);
    //         }
    //     };
    // }
}
