package com.GDU.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GDU.backend.models.Downloads;

@Repository
public interface DownloadsRepository extends JpaRepository<Downloads, Long> {

}
