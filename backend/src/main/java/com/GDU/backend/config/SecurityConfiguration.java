package com.GDU.backend.config;

import io.grpc.netty.shaded.io.netty.handler.codec.http.HttpMethod;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

import java.lang.reflect.Method;
import java.util.List;

import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
@CrossOrigin
public class SecurityConfiguration {
    private final JwtAuthenticationFilter JwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS", "PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        return http
                .cors(corsSpec -> corsSpec.configurationSource(request -> corsConfiguration))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests) -> requests
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
                        .requestMatchers(
                                "/api/v1/role/**"
                        ).hasAnyRole("ADMIN", "SUB-ADMIN")
                        .requestMatchers(DELETE, "api/v1/users/**")
                        .hasAnyRole("ADMIN", "SUB-ADMIN")
                        .requestMatchers(
                                "/api/v1/documents/upload"
                        ).hasAnyRole("TEACHER", "ADMIN", "SUB-ADMIN")
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/api/v1/documents/filter",
                                "/api/v1/favorites/**",
                                "/api/v1/downloads/**",
                                "/api/v1/notifications/**",
                                "/api/v1/documents/**",
                                "/api/v1/users/avatar/**",
                                "/api/v1/view-history",
                                "/api/v1/banners/**",
                                "/api/v1/comments/**"
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
                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout"))
                .build();
    }
}
