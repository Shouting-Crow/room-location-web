package com.project.roomlocationweb.config;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CorsConfig {

    public static CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        ArrayList<String> allowedOrigins = new ArrayList<>();
        allowedOrigins.add("http://localhost:3000");
        configuration.setAllowedOrigins(allowedOrigins);

        configuration.addAllowedMethod("*");

        configuration.addAllowedHeader("*");

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
