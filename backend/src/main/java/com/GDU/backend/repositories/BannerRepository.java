package com.GDU.backend.repositories;

import com.GDU.backend.models.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query("SELECT b FROM Banner b where b.enable = true")
    List<Banner> getBanners();
}
