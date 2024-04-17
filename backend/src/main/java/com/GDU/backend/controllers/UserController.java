package com.GDU.backend.controllers;

import com.GDU.backend.dtos.response.UserResponse;
import com.GDU.backend.models.ChangePasswordRequest;
import com.GDU.backend.models.User;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() { 
        return ResponseEntity.ok(userService.getAllUsers()); 
    } 

    @Secured("ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id, Principal principal) {
        return ResponseEntity.ok(userService.deleteUserById(id));
    }
}
