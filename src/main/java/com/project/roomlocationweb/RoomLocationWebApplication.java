package com.project.roomlocationweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RoomLocationWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(RoomLocationWebApplication.class, args);
    }

}
