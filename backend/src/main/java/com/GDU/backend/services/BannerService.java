package com.GDU.backend.services;

import com.GDU.backend.models.Banner;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {
    String createBanner(MultipartFile banner);

    List<Banner> getBanner();
}
