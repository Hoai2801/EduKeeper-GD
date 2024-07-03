package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.BannerDTO;
import com.GDU.backend.models.Banner;

import java.util.List;

public interface BannerService {
    String createBanner(BannerDTO banner);

    List<Banner> getBanners();
    
    List<Banner> getAllBanners();

    String activeBanner(Long id);

    String deleteBanner(Long id);

    String updateBanner(Long id, BannerDTO bannerDTO);
}
