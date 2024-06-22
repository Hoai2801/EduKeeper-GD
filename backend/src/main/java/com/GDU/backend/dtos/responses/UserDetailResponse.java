package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Department;
import com.GDU.backend.models.Role;
import com.GDU.backend.models.Specialized;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDetailResponse {
    private Long id;

    private String staffCode;

    private String username;

    private String email;

    private Role roles;

    private Department department;

    private Specialized specialized;

    private String klass;

    private LocalDateTime birthDay;

    private boolean enable;
}
