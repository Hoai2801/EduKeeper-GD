package com.GDU.backend.services;

import org.springframework.http.ResponseEntity;

public interface SettingService {
    ResponseEntity<?> getSettings();

    ResponseEntity<String> configureSetting(Long id, String value);
}
