//package com.GDU.backend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.
//        HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.
//        EnableWebSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.
//        InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//    @Bean
//    public SecurityFilterChain filterChain1(HttpSecurity http) throws
//            Exception {
//        http
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers(HttpMethod.GET, "/api/v1/document/**").permitAll()
//                        .requestMatchers("/authenticated").hasRole("ADMIN")
//                        .anyRequest().denyAll()
//                )
//                .csrf(Customizer.withDefaults())
//                .formLogin(Customizer.withDefaults())
//                .logout((logout) -> logout
//                        .deleteCookies("JSESSIONID")
//                        .invalidateHttpSession(true)
//                        .permitAll()
//                );
//        return http.build();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails user = User.builder()
//                .username("user")
//                .password(passwordEncoder().encode("userpassw"))
//                .roles("USER")
//                .build();
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("adminpassw"))
//                .roles("ADMIN")
//                .build();
//        return new InMemoryUserDetailsManager(user, admin);
//    }
//
//    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}