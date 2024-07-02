package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UserDetailDTO;
import com.GDU.backend.dtos.responses.UserDetailResponse;
import com.GDU.backend.dtos.responses.UserResponse;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @GetMapping("/{staffCode}")
    public ResponseEntity<UserDetailResponse> getUserResponseById(@PathVariable("staffCode") String staffCode) {
        return ResponseEntity.ok(
                userService.getUserResponseByStaffCode(staffCode)
        );
    }
    
    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody UserDetailDTO userDetailDTO) {
        return ResponseEntity.ok(userService.updateUser(userDetailDTO));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.deleteUserById(id));
    }
    
    @PostMapping("/avatar/{staffCode}")
    public ResponseEntity<String> changeAvatar(
            @PathVariable("staffCode") String staffCode,
            @RequestBody MultipartFile avatar
    ) {
        return ResponseEntity.ok(userService.changeAvatar(staffCode, avatar));
    }

    @GetMapping("/top-downloads")
    public ResponseEntity<?> getTop10UserWithMostDownloads() {
        try {
            return ResponseEntity.ok(userService.getTop10UserWithMostDownloads());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/monthly/{year}")
    public ResponseEntity<?> countUsersMonthly(@PathVariable("year") int year) {
        try {

            return ResponseEntity.ok(userService.countUsersMonthly(year));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/type/{year}")
    public ResponseEntity<?> countUsersByRoles(@PathVariable("year") int year) {
        try {

            return ResponseEntity.ok(userService.countUsersByRoles(year));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
