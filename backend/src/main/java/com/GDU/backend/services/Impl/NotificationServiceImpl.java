package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.models.Notification;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.NotificationRepository;
import com.GDU.backend.services.NotificationService;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public List<NotificationDTO> getAllNotificationOfUser(String staffCode) {
        User user = userService.getUserByStaffCode(staffCode);
        List<Notification> notificationList = notificationRepository.findByReceiverUser(user.getId());
        // return list of notification
        return notificationList.stream().map(
                        notification -> NotificationDTO.builder()
                                .sender(notification.getSender().getStaffCode())
                                .receiver(notification.getReceiver().getStaffCode())
                                .title(notification.getTitle())
                                .content(notification.getContent())
                                .is_check(notification.is_check())
                                .created_at(notification.getCreated_at())
                                .build())
                .toList().reversed();
    }

    public void send(NotificationDTO message) {
        User sender = userService.getUserByStaffCode(message.getSender());
        User receiver = userService.getUserByStaffCode(message.getReceiver());
        Notification notification = Notification.builder()
                .sender(sender)
                .receiver(receiver)
                .title(message.getTitle())
                .content(message.getContent())
                .created_at(LocalDateTime.now())
                .build();
        log.info("Sending message: {}", notification);
        notificationRepository.save(notification);
    }

    @Override
    public void makeCheckedAllNotificationOfUser(String staffCode) {
        User user = userService.getUserByStaffCode(staffCode);
        List<Notification> notificationList = notificationRepository.findByReceiverUser(user.getId());
        notificationList.forEach(notification -> notification.set_check(true));
        notificationRepository.saveAll(notificationList);
    }
}
