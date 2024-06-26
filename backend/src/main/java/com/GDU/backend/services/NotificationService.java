package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.NotificationDTO;

import java.util.List;

public interface NotificationService {
    List<NotificationDTO> getAllNotificationOfUser(String staffCode);

    void send(NotificationDTO message);

    void makeCheckedAllNotificationOfUser(String staffCode);
}
