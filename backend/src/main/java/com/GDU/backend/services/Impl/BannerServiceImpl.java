package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.BannerDTO;
import com.GDU.backend.models.Banner;
import com.GDU.backend.repositories.BannerRepository;
import com.GDU.backend.services.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createBanner(BannerDTO banner) {
        // generate file name and path
        String fileName = System.currentTimeMillis() + "_" + banner.getBanner().getOriginalFilename();
        File destFile = new File("src/main/resources/static/banner/" + fileName);

        // save file
        try {
            Path uploadDir = Paths.get("src/main/resources/static/banner/");
            Files.createDirectories(uploadDir);
            Files.copy(banner.getBanner().getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Tạo banner thất bại");
        }
        Banner newBanner = Banner.builder()
                .image(fileName)
                .url(banner.getUrl())
                .enable(banner.isEnable())
                .build();
        bannerRepository.save(newBanner);
        return ResponseEntity.ok("Tạo banner mới thành công!");
    }

    @Override
    public List<Banner> getBanners() {
        return bannerRepository.getBanners();
    }

    @Override
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    @Override
    public ResponseEntity<String> activeBanner(Long id) {
        Banner existBanner = bannerRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Banner not found")
        );
        existBanner.setEnable(!existBanner.isEnable());
        bannerRepository.save(existBanner);
        return ResponseEntity.ok("Cập nhật banner thành công");
    }

    @Override
    public ResponseEntity<String> deleteBanner(Long id) {
        Banner existBanner = bannerRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Banner not found"));
        File oldFile = new File("src/main/resources/static/banner/" + existBanner.getImage());
        if (oldFile.exists()) {
            System.out.println("Delete file: " + oldFile.getName());
            boolean result = oldFile.delete();
            if (!result) {
                return ResponseEntity.badRequest().body("Xóa banner thất bại");
            }
        }
        bannerRepository.delete(existBanner);
        return ResponseEntity.ok("Xóa banner thành công");
    }

    @Override
    public ResponseEntity<String> updateBanner(Long id, BannerDTO bannerDTO) {
        Banner existBanner = bannerRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Banner not found"));
        existBanner.setUrl(bannerDTO.getUrl());
        existBanner.setEnable(bannerDTO.isEnable());
        bannerRepository.save(existBanner);
        return ResponseEntity.ok("Cập nhật banner thành công");
    }
}
