package com.GDU.backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/v1/images")
public class ImageController {

    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName) throws IOException {
        Path imagePath = Paths.get("src", "main", "resources", "static", "images", imageName);

        // Read the image file into a byte array
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Set the appropriate content type for the image
        MediaType mediaType = MediaType.IMAGE_PNG; // Assuming PNG format

        // Return the image bytes with appropriate headers
        return ResponseEntity.ok().contentType(mediaType).body(imageBytes);
    }

    @GetMapping("/avatar/{imageName}")
    public ResponseEntity<byte[]> getAvatar(@PathVariable("imageName") String imageName) throws IOException {
        Path imagePath = Paths.get("src", "main", "resources", "static", "avatar", imageName);

        // Read the image file into a byte array
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Set the appropriate content type for the image
        MediaType mediaType = MediaType.IMAGE_PNG; // Assuming PNG format

        // Return the image bytes with appropriate headers
        return ResponseEntity.ok().contentType(mediaType).body(imageBytes);
    }

    @GetMapping("/banner/{imageName}")
    public ResponseEntity<byte[]> getBanner(@PathVariable("imageName") String imageName) throws IOException {
        Path imagePath = Paths.get("src", "main", "resources", "static", "banner", imageName);

        // Read the image file into a byte array
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Set the appropriate content type for the image
        MediaType mediaType = MediaType.IMAGE_PNG; // Assuming PNG format

        // Return the image bytes with appropriate headers
        return ResponseEntity.ok().contentType(mediaType).body(imageBytes);
    }
}
