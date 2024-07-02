package com.GDU.backend.dtos.requests;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BannerDTO {
    private MultipartFile banner;
    
}
