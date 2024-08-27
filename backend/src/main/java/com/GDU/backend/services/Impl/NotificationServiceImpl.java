package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Notification;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.NotificationRepository;
import com.GDU.backend.services.NotificationService;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
        private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);
        private final NotificationRepository notificationRepository;
        private final UserService userService;
        private final DocumentRepository documentRepository;

        @Override
        public List<NotificationDTO> getAllNotificationOfUser(String staffCode) {
                User user = userService.getUserByStaffCode(staffCode);
                List<Notification> notificationList = notificationRepository.findByReceiverUser(user.getId());
                // return list of notification

                // return notificationList.stream().map(
                // notification -> NotificationDTO.builder()
                // .sender(notification.getSender().getStaffCode())
                // .receiver(notification.getReceiver().getStaffCode())
                // .title(notification.getTitle())
                // .content(notification.getContent())
                // .is_check(notification.is_check())
                // .created_at(notification.getCreated_at())
                // .build())
                // .toList().reversed();
                return notificationList.stream()
                                .map(notification -> NotificationDTO.builder()
                                                .sender(notification.getSender().getStaffCode())
                                                .receiver(notification.getReceiver().getStaffCode())
                                                .title(notification.getTitle())
                                                .content(notification.getContent())
                                                .is_check(notification.is_check())
                                                .created_at(notification.getCreated_at())
                                                .build())
                                .sorted(Comparator.comparing(NotificationDTO::getCreated_at).reversed())
                                .collect(Collectors.toList());
        }

        public void send(NotificationDTO message) {
                User sender = userService.getUserByStaffCode(message.getSender());
                User receiver = userService.getUserByStaffCode(message.getReceiver());
                Document document = documentRepository.findBySlug(message.getDocument())
                                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
                Notification notification = Notification.builder()
                                .sender(sender)
                                .receiver(receiver)
                                .title(message.getTitle())
                                .document(document)
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
