package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.UserDetailDTO;
import com.GDU.backend.dtos.responses.UserDetailResponse;
import com.GDU.backend.dtos.responses.UserRakingResI;
import com.GDU.backend.dtos.responses.UserResponse;
import com.GDU.backend.models.User;
import org.springframework.stereotype.Service;

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
}
