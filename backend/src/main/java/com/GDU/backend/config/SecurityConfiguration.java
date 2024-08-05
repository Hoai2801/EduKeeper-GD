package com.GDU.backend.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration implements WebMvcConfigurer {
    private final JwtAuthenticationFilter JwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://103.241.43.206:3000", "http://103.241.43.206", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedOrigins(List.of("http://103.241.43.206:3000", "http://103.241.43.206", "http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return http
                .cors(cors -> cors.configurationSource(source))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/v3/api-docs",
                                "/configuration/ui",
                                "/swagger-resources/**",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "/api/v1/admin/**",
                                "/webjars/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(GET,
                                "/api/v1/role/**"
                        ).hasAnyRole("ADMIN", "SUB-ADMIN", "TEACHER", "USER")
                        .requestMatchers(POST,
                                "/api/v1/specializes",
                                "/api/v1/subjects"
                        )
                        .hasAnyRole("ADMIN", "SUB-ADMIN")
                        .requestMatchers(PUT,
                                "/api/v1/departments/**",
                                "/api/v1/settings/**"
                        )
                        .hasAnyRole("ADMIN", "SUB-ADMIN")
                        .requestMatchers(DELETE,
                                "/api/v1/users/**",
                                "/api/v1/subjects/**",
                                "/api/v1/specializes/**",
                                "/api/v1/departments/**"
                        )
                        .hasAnyRole("ADMIN", "SUB-ADMIN")
                        .requestMatchers(
                                "/api/v1/documents/upload"
                        ).hasAnyRole("TEACHER", "ADMIN", "SUB-ADMIN")
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/api/v1/documents/filter",
                                "/api/v1/favorites/**",
                                "/api/v1/downloads/**",
                                "/api/v1/documents/**",
                                "/api/v1/view-history",
                                "/api/v1/banners/**",
                                "/api/v1/comments/**",
                                "/api/v1/users/**",
                                "/api/v1/specializes/**"
                        ).permitAll()
                        .requestMatchers(GET).permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ))
                .logout(logout -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(JwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
