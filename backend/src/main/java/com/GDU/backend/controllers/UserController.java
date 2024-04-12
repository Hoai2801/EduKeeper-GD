// package com.GDU.backend.controllers;
//
// import com.GDU.backend.models.ChangePasswordRequest;
// import com.GDU.backend.services.UserService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
//
// import java.security.Principal;
//
// @RestController
// @RequestMapping("/api/v1/users")
// @RequiredArgsConstructor
// public class UserController {
// private final UserService userService;
//
// @PatchMapping
// public ResponseEntity<?> changePassword(
// @RequestBody ChangePasswordRequest request,
// Principal connectedUser
// ) {
// userService.changePassword(request, connectedUser);
// return ResponseEntity.ok().build();
// }
// }
