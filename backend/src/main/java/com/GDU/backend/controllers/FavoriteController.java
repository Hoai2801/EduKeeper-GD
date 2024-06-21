package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.services.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    
    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        try {
            return ResponseEntity.ok(favoriteService.createFavorite(favoriteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @PostMapping("/is-favorite")
    public ResponseEntity<?> checkIsFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        try {
            return ResponseEntity.ok(favoriteService.checkIsFavorite(favoriteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @DeleteMapping
    public ResponseEntity<?> deleteFavoriteById(@RequestBody FavoriteDTO favoriteDTO) {
        try {
            System.out.println("favoriteDTO = " + favoriteDTO);
            return ResponseEntity.ok(favoriteService.deleteFavoriteById(favoriteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/{staffCode}")
    public ResponseEntity<?> getFavoritesByUserId(@PathVariable("staffCode") String staffCode) {
        try {
            return ResponseEntity.ok(favoriteService.getFavoritesByUserId(staffCode));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/count-total/{userId}")
    public ResponseEntity<?> getFavoritesTotalOfDocsOfUser(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok(favoriteService.getTotalOfDocsOfUser(userId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
}
