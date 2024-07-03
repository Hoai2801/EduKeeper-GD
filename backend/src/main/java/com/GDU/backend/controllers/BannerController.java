package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.BannerDTO;
import com.GDU.backend.models.Banner;
import com.GDU.backend.services.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/banners")
@RequiredArgsConstructor
public class BannerController {
    private final BannerService bannerService;
    
    @PostMapping
    public String createBanner(@ModelAttribute BannerDTO bannerDTO) {
        return bannerService.createBanner(bannerDTO);
    }
    
    @PutMapping("/active/{id}")
    public String activeBanner(@PathVariable("id") Long id) {
        return bannerService.activeBanner(id);
    }
    
    @DeleteMapping("/{id}")
    public String deleteBanner(@PathVariable("id") Long id) {
        return bannerService.deleteBanner(id);
    }
    
    @PutMapping("/{id}")
    public String updateBanner(@PathVariable("id") Long id, @ModelAttribute BannerDTO bannerDTO) {
        return bannerService.updateBanner(id, bannerDTO);
    }
    
    @GetMapping
    public List<Banner> getBanners() {
        return bannerService.getBanners();
    }
    
    @GetMapping("/all")
    public List<Banner> getAllBanners() {
        return bannerService.getAllBanners();
    }
}
