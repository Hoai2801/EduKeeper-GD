package com.GDU.backend.controllers;

import com.GDU.backend.config.ZipUtils;
import com.GDU.backend.services.Impl.BackupServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/backups")
public class BackupController {

    private final BackupServiceImpl backupService;
    
    @PostMapping
    public String backupFiles() {
        backupService.createBackup();
        return "Backup created successfully.";
    }

    @PostMapping("/download-backup/{fileName}")
    public ResponseEntity<Resource> downloadBackup(@PathVariable String fileName) {
        File backupFile = new File(ZipUtils.getBackupPath() + fileName);
        if (backupFile.exists()) {
            Resource resource = new FileSystemResource(backupFile);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + backupFile.getName());
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(backupFile.length())
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/list-backups")
    public ResponseEntity<List<String>> listBackupFiles() {
        List<String> backupFiles = backupService.listBackupFiles();
        return ResponseEntity.ok(backupFiles);
    }

    @PostMapping("/restore-backup/{fileName}")
    public ResponseEntity<String> restoreBackup(@PathVariable String fileName) {
        boolean success = backupService.restoreBackup(fileName);
        if (success) {
            return ResponseEntity.ok("Backup restored successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to restore backup.");
        }
    }
    
    @PostMapping("/restore-database/{fileName}")
    public ResponseEntity<String> restoreDatabase(@PathVariable String fileName) {
        boolean success = backupService.restoreDatabase(fileName);
        if (success) {
            return ResponseEntity.ok("Database restored successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to restore database.");
        }
    }
    
    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteBackup(@PathVariable String fileName) {
        boolean success = backupService.deleteBackup(fileName);
        if (success) {
            return ResponseEntity.ok("Backup deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete backup.");
        }
    }
}
