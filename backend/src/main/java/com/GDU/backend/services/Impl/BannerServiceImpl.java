package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Banner;
import com.GDU.backend.repositories.BannerRepository;
import com.GDU.backend.services.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {
    private final BannerRepository bannerRepository;
    
    @Override
    public String createBanner(MultipartFile banner) {
        // generate file name and path
        String fileName = System.currentTimeMillis() + "_" + banner.getOriginalFilename();
        File destFile = new File("src/main/resources/static/banner/" + fileName);

        // save file
        try {
            Path uploadDir = Paths.get("src/main/resources/static/banner/");
            Files.createDirectories(uploadDir);
            Files.copy(banner.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Banner newBanner = Banner.builder()
                .path(fileName)
                .build();
        bannerRepository.save(newBanner);
        return "Tạo banner thành công";
    }

    @Override
    public List<Banner> getBanner() {
        return bannerRepository.findAll();
    }
}
