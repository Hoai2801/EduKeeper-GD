package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.models.Notification;
import com.GDU.backend.services.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Log4j2
public class NotificationController {
    private final NotificationService notificationService;
    
    @GetMapping("/user/{staffCode}")
    public DeferredResult<List<NotificationDTO>> getAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        DeferredResult<List<NotificationDTO>> deferredResult = new DeferredResult<>();
        deferredResult.setResult(notificationService.getAllNotificationOfUser(staffCode));
        return deferredResult;
    }

    @GetMapping("/user/checked/{staffCode}")
    public void makeCheckedAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        notificationService.makeCheckedAllNotificationOfUser(staffCode);
    }
}
