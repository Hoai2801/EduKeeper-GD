package com.GDU.backend.services.Impl;

import com.GDU.backend.config.DatabaseUtils;
import com.GDU.backend.config.ZipUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BackupServiceImpl {
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    public void createBackup() {
        try {
            // Export database
            String dbName = dbUrl.substring(dbUrl.lastIndexOf("/") + 1);
            DatabaseUtils.exportDatabase(dbName, dbUser, dbPassword, "backup-" + System.currentTimeMillis() + ".sql");
            String[] directories = {"avatar", "banner", "thumbnail", "uploads"};
            String outputZipFile = "backup-" + System.currentTimeMillis() + ".zip";
            ZipUtils.zipDirectories(directories, outputZipFile);
            System.out.println("Backup created successfully: " + outputZipFile);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public List<String> listBackupFiles() {
        File backupDir = new File(ZipUtils.getBackupPath());
        File[] backupFiles = backupDir.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (backupFiles != null) {
            for (File file : backupFiles) {
                if (file.isFile() && file.getName().endsWith(".zip")) {
                    fileNames.add(file.getName());
                }
            }
        }
        return fileNames;
    }

    public List<String> listBackupDatabase() {
        File backupDir = new File(ZipUtils.getBackupPath());
        File[] backupFiles = backupDir.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (backupFiles != null) {
            for (File file : backupFiles) {
                if (file.isFile() && file.getName().endsWith(".sql")) {
                    fileNames.add(file.getName());
                }
            }
        }
        return fileNames;
    }

    public boolean restoreBackup(String fileName) {
        try {
            // Clean up old directories
            String[] directories = {"avatar", "banner", "thumbnail", "upload"};
            for (String dir : directories) {
                File directory = new File(ZipUtils.getStaticPath() + dir);
                if (directory.exists()) {
                    deleteDirectory(directory);
                }
            }

            // Restore from backup
            ZipUtils.unzipFile(ZipUtils.getBackupPath() + fileName, ZipUtils.getStaticPath());
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private void deleteDirectory(File directory) {
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        directory.delete();
    }

    public boolean restoreDatabase(String fileName) {
        try {
            // Restore database
            String dbName = dbUrl.substring(dbUrl.lastIndexOf("/") + 1);
            DatabaseUtils.importDatabase(dbName, dbUser, dbPassword, fileName);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
