package com.GDU.backend.repositories;

import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n FROM Notification n WHERE n.receiver.id = :id")
    List<Notification> findByReceiverUser(long id);
}
