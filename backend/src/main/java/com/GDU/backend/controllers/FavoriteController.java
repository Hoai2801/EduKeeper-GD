package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.services.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    
    @PostMapping
    public ResponseEntity<String> createFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        return ResponseEntity.ok(favoriteService.createFavorite(favoriteDTO));
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<DocumentResponseDTO>> getDocumentsFavoritesByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(favoriteService.getDocumentsFavoritesByUserId(userId));
    }
    
    @GetMapping("/author/{authorId}")
    public ResponseEntity<Integer> getTotalFavoritesCountByAuthor(@PathVariable("authorId") Long authorId) {
        return ResponseEntity.ok(favoriteService.getTotalFavoritesCountByAuthor(authorId));
    }
    
    @GetMapping("/is-favorite/{userId}/{documentId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable("userId") Long userId, @PathVariable("documentId") Long documentId) {
        return ResponseEntity.ok(favoriteService.isFavorite(userId, documentId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFavoriteById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(favoriteService.deleteFavoriteById(id));
    }
}
