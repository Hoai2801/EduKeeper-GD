package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Setting;
import com.GDU.backend.repositories.SettingRepository;
import com.GDU.backend.services.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {
    private final SettingRepository settingRepository;
    @Override
    public ResponseEntity<List<Setting>> getSettings() {
        return ResponseEntity.ok().body(settingRepository.findAll());
    }

    @Override
    public ResponseEntity<String> configureSetting(Long id, String value) {
        var setting = settingRepository.findById(id).orElse(null);
        if (setting != null) {
            setting.setValue(value);
            settingRepository.save(setting);
            return ResponseEntity.ok().body("Setting updated successfully");
        }
        return ResponseEntity.badRequest().body("Setting not found");
    }
}
