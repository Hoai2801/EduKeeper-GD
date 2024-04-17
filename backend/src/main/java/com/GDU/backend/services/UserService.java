package com.GDU.backend.services;

import com.GDU.backend.dtos.response.UserResponse;
import com.GDU.backend.models.ChangePasswordRequest;
import com.GDU.backend.models.User;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public interface UserService {
    List<UserResponse> getAllUsers();

    String deleteUserById(Long id);
}
