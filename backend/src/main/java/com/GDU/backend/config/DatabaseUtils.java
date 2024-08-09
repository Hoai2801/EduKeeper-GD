package com.GDU.backend.config;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

public class DatabaseUtils {

    private static final String DB_BACKUP_PATH = "src/main/resources/static/backup/";

    public static void exportDatabase(String dbName, String dbUser, String dbPassword, String outputFileName) throws IOException, InterruptedException {
        // Ensure the backup directory exists
        File backupDir = new File(DB_BACKUP_PATH);
        if (!backupDir.exists()) {
            backupDir.mkdirs();
        }

        List<String> commands = new ArrayList<>();
        commands.add("mysqldump");
        commands.add("-u" + dbUser);
        commands.add("-p" + dbPassword);
        commands.add(dbName);
        ProcessBuilder processBuilder = new ProcessBuilder(commands);
        processBuilder.redirectOutput(new File(DB_BACKUP_PATH + outputFileName));
        Process process = processBuilder.start();
        int processComplete = process.waitFor();
        if (processComplete != 0) {
            throw new IOException("Could not create backup");
        }
    }

    public static void importDatabase(String dbName, String dbUser, String dbPassword, String inputFileName) throws IOException, InterruptedException {
        List<String> commands = new ArrayList<>();
        commands.add("mysql");
        commands.add("-u" + dbUser);
        commands.add("-p" + dbPassword);
        commands.add(dbName);
        ProcessBuilder processBuilder = new ProcessBuilder(commands);
        processBuilder.redirectInput(new File(DB_BACKUP_PATH + inputFileName));
        Process process = processBuilder.start();
        int processComplete = process.waitFor();
        if (processComplete != 0) {
            throw new IOException("Could not restore backup");
        }
    }
}

