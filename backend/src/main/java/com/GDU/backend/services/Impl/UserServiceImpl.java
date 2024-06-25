package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.UserDetailDTO;
import com.GDU.backend.dtos.responses.UserDetailResponse;
import com.GDU.backend.dtos.responses.UserRakingResI;
import com.GDU.backend.dtos.responses.UserResponse;
import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.DepartmentRepository;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.repositories.TokenRepository;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    // private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final SpecializedRepository specializedRepository;
    private final DepartmentRepository departmentRepository;

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
        List<Token> tokens = tokenRepository.findTokensByUserId(id);
        tokenRepository.deleteAll(tokens);
        userRepository.deleteById(id);
        return "deleted";
    }

    @Override
    public void changePassword(User user, String newPassword) {
        // user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public User getUserByStaffCode(String staffCode) {
        return userRepository.findByStaffCode(staffCode).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return userRepository.findByEmail(userEmail).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public List<UserRakingResI> getTop10UserWithMostDownloads() {
        try {
            return userRepository.getRakingUser();
        } catch (Exception e) {
            throw new UnsupportedOperationException(
                    "Unimplemented method get top 10 user with most downloads: " + e.getMessage());
        }
    }

    @Override
    public UserDetailResponse getUserResponseByStaffCode(String staffCode) {
        User user = getUserByStaffCode(staffCode);
        if (user != null) {
            return UserDetailResponse.builder()
                    .email(user.getEmail())
                    .staffCode(user.getStaffCode())
                    .username(user.getName())
                    .birthDay(user.getBirthDay())
                    .department(user.getDepartment())
                    .klass(user.getKlass())
                    .specialized(user.getSpecialized())
                    .roles(user.getRoles())
                    .id(user.getId())
                    .build();
        }
        return null;
    }

    @Override
    public String updateUser(UserDetailDTO userDetailDTO) {
        User user = getUserByStaffCode(userDetailDTO.getStaffCode());
        if (user == null) {
            return "user not found";
        }
        Department department = departmentRepository.findById(userDetailDTO.getDepartment()).orElse(null);
        if (department == null) {
            return "department not found";
        }
        Specialized specialized = specializedRepository.findById(userDetailDTO.getSpecialized()).orElse(null);
        if (specialized == null) {
            return "specialized not found";
        }
        user.setUsername(userDetailDTO.getUsername());
        user.setDepartment(department);
        user.setKlass(userDetailDTO.getKlass());
        user.setSpecialized(specialized);
        user.setBirthDay(userDetailDTO.getBirthDay());
        userRepository.save(user);
        return "updated";
    }
}