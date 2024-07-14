package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.UserDetailDTO;
import com.GDU.backend.dtos.responses.*;
import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    // private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final SpecializedRepository specializedRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;

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
        return "Xóa người dùng thành công!";
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
    public List<Monthly> countUsersMonthly(int year) {
        try {
            return userRepository.countUsersMonthly(year);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Users: " + e.getMessage());
        }
    }

    @Override
    public List<TypeRes> countUsersByRoles(int year) {
        try {
            return userRepository.countUsersByRole(year);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Users: " + e.getMessage());
        }
    }

    @Override
    public String changeAvatar(String staffCode, MultipartFile avatar) {
        User user = userRepository.findByStaffCode(staffCode).orElse(null);
        if (user != null) {
            // generate file name and path
            String fileName = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
            File destFile = new File("src/main/resources/static/avatar/" + fileName);

            // save file
            try {
                Path uploadDir = Paths.get("src/main/resources/static/avatar/");
                Files.createDirectories(uploadDir);
                Files.copy(avatar.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            } catch (Exception e) {
                e.printStackTrace();
            }

            user.setAvatar(fileName);
            userRepository.save(user);
            return "Thay đổi avatar thành công!";
        }
        return "Hệ thống hiện tại không thể thực hiện thao tác này";
    }

    @Override
    public ResponseEntity<String> blockUser(String staffCode) {
        User user = getUserByStaffCode(staffCode);
        if (user != null) {
            user.setAccountLocked(true);
            userRepository.save(user);
            return ResponseEntity.ok("Đã khoá người dùng!");
        }
        return ResponseEntity.badRequest().body("Lỗi hệ thống, hiện tại không thể thực hiện thao tác này");
    }

    @Override
    public Boolean isUserBlocked(String staffCode) {
        User user = getUserByStaffCode(staffCode);
        if (user != null) {
            return user.isAccountLocked();
        }
        return true;
    }

    @Override
    public ResponseEntity<String> unblockUser(String staffCode) {
        User user = getUserByStaffCode(staffCode);
        if (user != null) {
            user.setAccountLocked(false);
            userRepository.save(user);
            return ResponseEntity.ok("Đã mở khoá người dùng!");
        }
        return ResponseEntity.badRequest().body("Lỗi hệ thống, hiện tại không thể thực hiện thao tác không");
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
                    .avatar(user.getAvatar())
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
        if (userDetailDTO.getRole().equals("ROLE_STUDENT")) {
            Department department = departmentRepository.findById(userDetailDTO.getDepartment()).orElse(null);
            if (department == null) {
                return "department not found";
            }
            Specialized specialized = specializedRepository.findById(userDetailDTO.getSpecialized()).orElse(null);
            if (specialized == null) {
                return "specialized not found";
            }
            user.setDepartment(department);
            user.setSpecialized(specialized);
        }
        var role = roleRepository.findByName(userDetailDTO.getRole()).orElseThrow(
                () -> new UsernameNotFoundException("Role not found")
        );
        user.setRoles(role);
        user.setUsername(userDetailDTO.getUsername());
        user.setKlass(userDetailDTO.getKlass());
        user.setBirthDay(userDetailDTO.getBirthDay());
        userRepository.save(user);
        return "success";
    }

}