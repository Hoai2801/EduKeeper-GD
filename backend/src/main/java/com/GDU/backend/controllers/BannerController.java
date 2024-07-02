package com.GDU.backend.controllers;

import com.GDU.backend.models.Banner;
import com.GDU.backend.services.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/banner")
@RequiredArgsConstructor
public class BannerController {
    private final BannerService bannerService;
    
    @PostMapping
    public String createBanner(@RequestBody MultipartFile banner) {
        return bannerService.createBanner(banner);
    }
    
    @GetMapping
    public List<Banner> getBanner() {
        return bannerService.getBanner();
    }
}
