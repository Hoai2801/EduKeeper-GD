package com.GDU.backend.controllers;

import com.GDU.backend.services.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Log4j2
public class NotificationController {
    private final NotificationService notificationService;
    
    @GetMapping("/user/{staffCode}")
    public ResponseEntity<?> getAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        return ResponseEntity.ok(notificationService.getAllNotificationOfUser(staffCode));
    }

    @GetMapping("/user/checked/{staffCode}")
    public void makeCheckedAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        notificationService.makeCheckedAllNotificationOfUser(staffCode);
    }
}
