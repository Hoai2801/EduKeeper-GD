package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.response.UserResponse;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> UserResponse.builder()
                        .email(user.getEmail())
                        .staffCode(user.getStaffCode())
                        .username(user.getName())
                        .accountLocked(user.isAccountLocked())
                        .createdDate(user.getCreatedDate())
                        .lastModifiedDate(user.getLastModifiedDate())
                        .roles(user.getRoles())
                        .id(user.getId())
                        .build())
                .toList();
    }

    @Override
    public String deleteUserById(Long id) {
        userRepository.deleteById(id);
        return "deleted";
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return userRepository.findByEmail(userEmail).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );
    }
}