package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.UserDetailDTO;
import com.GDU.backend.dtos.responses.*;
import com.GDU.backend.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
public interface UserService {
    List<UserResponse> getAllUsers();

    String deleteUserById(Long id);

    void changePassword(User user, String newPassword);

    User getUserByStaffCode(String staffCode);

    List<UserRakingResI> getTop10UserWithMostDownloads();

    UserDetailResponse getUserResponseByStaffCode(String staffCode);

    String updateUser(UserDetailDTO userDetailDTO);

    List<Monthly> countUsersMonthly(int year);

    List<TypeRes> countUsersByRoles(int year);

    String changeAvatar(String id, MultipartFile avatar);

    ResponseEntity<String> blockUser(String staffCode);

    Boolean isUserBlocked(String staffCode);

    ResponseEntity<String> unblockUser(String staffCode);
}
