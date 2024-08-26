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
import java.util.concurrent.ForkJoinPool;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Log4j2
public class NotificationController {
    private final NotificationService notificationService;
    
    @GetMapping("/user/{staffCode}")
    public DeferredResult<List<NotificationDTO>> getAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        DeferredResult<List<NotificationDTO>> deferredResult = new DeferredResult<>();
        // Set a timeout callback
        deferredResult.onTimeout(() -> deferredResult.setErrorResult("Request timeout occurred."));

        // Handle error scenarios
        deferredResult.onError((Throwable t) -> deferredResult.setErrorResult("An error occurred: " + t.getMessage()));

        // Use a separate thread to simulate async behavior
        ForkJoinPool.commonPool().submit(() -> {
            try {
                List<NotificationDTO> notifications = notificationService.getAllNotificationOfUser(staffCode);
                deferredResult.setResult(notifications);
            } catch (Exception e) {
                deferredResult.setErrorResult("An error occurred while fetching notifications.");
            }
        });
        return deferredResult;
    }

    @GetMapping("/user/checked/{staffCode}")
    public void makeCheckedAllNotificationOfUser(@PathVariable("staffCode") String staffCode) {
        notificationService.makeCheckedAllNotificationOfUser(staffCode);
    }
}
