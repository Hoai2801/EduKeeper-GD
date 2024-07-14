package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.BannerDTO;
import com.GDU.backend.models.Banner;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BannerService {
    ResponseEntity<String> createBanner(BannerDTO banner);

    List<Banner> getBanners();
    
    List<Banner> getAllBanners();

    ResponseEntity<String> activeBanner(Long id);

    ResponseEntity<String> deleteBanner(Long id);

    ResponseEntity<String> updateBanner(Long id, BannerDTO bannerDTO);
}
