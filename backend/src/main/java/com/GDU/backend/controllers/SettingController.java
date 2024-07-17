package com.GDU.backend.controllers;

import com.GDU.backend.services.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@RestController
public class SettingController {
    private final SettingService settingService;
    
    @GetMapping
    public ResponseEntity<?> getSettings() {
        return settingService.getSettings();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> configureSetting(
            @PathVariable Long id,
            @RequestBody String value
    ) {
        System.out.println(value);
        return settingService.configureSetting(id, value);
    }
}
