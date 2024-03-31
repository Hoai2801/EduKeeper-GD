package com.GDU.backend.controllers;

import java.util.concurrent.CompletableFuture;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.FavoriteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @Validated
    @Async
    @PostMapping
    public CompletableFuture<ResponseEntity<String>> createFavorite(
            @Valid @ModelAttribute FavoriteDTO favoriteDTO) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return ResponseEntity.ok(favoriteService.createFavorite(favoriteDTO));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error create favorite: " + e.getMessage());
            }
        });
    }

    @GetMapping("")
    public ResponseEntity<?> getAllFavorite() {
        try {
            return ResponseEntity.ok(favoriteService.getAllFavorite());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFavoritesByUserId(@PathVariable("userId") Long userID) {
        try {
            return ResponseEntity.ok(favoriteService.getFavoritesByUserId(userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/document/{documentId}")
    public ResponseEntity<?> getFavoritesByDocumentId(@PathVariable("documentId") Long documentId) {
        try {
            return ResponseEntity.ok(favoriteService.getFavoritesByDocsId(documentId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteFavoriteById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(favoriteService.deleteFavoriteById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
