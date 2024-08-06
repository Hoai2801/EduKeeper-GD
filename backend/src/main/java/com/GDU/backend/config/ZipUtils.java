package com.GDU.backend.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipUtils {

    private static final String STATIC_PATH = "src/main/resources/static/";
    private static final String BACKUP_PATH = STATIC_PATH + "backup/";

    public static String getBackupPath() {
        return BACKUP_PATH;
    }
    
    public static String getStaticPath() {
        return STATIC_PATH;
    }

    public static void zipDirectories(String[] directories, String outputZipFile) throws IOException {
        // Ensure the backup directory exists
        File backupDir = new File(BACKUP_PATH);
        if (!backupDir.exists()) {
            backupDir.mkdirs();
        }

        // Create the zip file in the backup directory
        try (FileOutputStream fos = new FileOutputStream(BACKUP_PATH + outputZipFile);
             ZipOutputStream zos = new ZipOutputStream(fos)) {

            for (String dir : directories) {
                File directoryToZip = new File(STATIC_PATH + dir);
                if (directoryToZip.exists() && directoryToZip.isDirectory()) {
                    zipDirectory(directoryToZip, directoryToZip.getName(), zos);
                } else {
                    System.err.println("Directory does not exist or is not a directory: " + directoryToZip.getAbsolutePath());
                }
            }
        }
    }

    private static void zipDirectory(File folder, String parentFolder, ZipOutputStream zos) throws IOException {
        for (File file : folder.listFiles()) {
            if (file.isDirectory()) {
                zipDirectory(file, parentFolder + "/" + file.getName(), zos);
                continue;
            }

            zos.putNextEntry(new ZipEntry(parentFolder + "/" + file.getName()));

            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[1024];
                int len;
                while ((len = fis.read(buffer)) > 0) {
                    zos.write(buffer, 0, len);
                }
            }

            zos.closeEntry();
        }
    }

    public static void unzipFile(String zipFilePath, String destDir) throws IOException {
        File dir = new File(destDir);
        // create output directory if it doesn't exist
        if (!dir.exists()) dir.mkdirs();
        FileInputStream fis;
        //buffer for read and write data to file
        byte[] buffer = new byte[1024];
        fis = new FileInputStream(zipFilePath);
        ZipInputStream zis = new ZipInputStream(fis);
        ZipEntry ze = zis.getNextEntry();
        while (ze != null) {
            String fileName = ze.getName();
            File newFile = new File(destDir + File.separator + fileName);
            System.out.println("Unzipping to " + newFile.getAbsolutePath());
            //create directories for sub directories in zip
            new File(newFile.getParent()).mkdirs();
            FileOutputStream fos = new FileOutputStream(newFile);
            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
            fos.close();
            //close this ZipEntry
            zis.closeEntry();
            ze = zis.getNextEntry();
        }
        //close last ZipEntry
        zis.closeEntry();
        zis.close();
        fis.close();
    }

}
