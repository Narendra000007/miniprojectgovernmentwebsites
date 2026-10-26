package com.govopps.platform.config;

import com.govopps.platform.model.*;
import com.govopps.platform.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initData(
            UserRepository userRepo,
            OpportunityRepository opportunityRepo) {
        return args -> {
            // Data is seeded via H2 seed script or manually.
            // Application starts cleanly; JPA manages schema via ddl-auto=update.
        };
    }
}
