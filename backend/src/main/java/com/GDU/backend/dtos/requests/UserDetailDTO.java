package com.GDU.backend.dtos.requests;

import com.GDU.backend.models.Department;
import com.GDU.backend.models.Role;
import com.GDU.backend.models.Specialized;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDetailDTO {
    private String staffCode;

    private String username;

    private String email;

    private long department;

    private long specialized;

    private String klass;

    private LocalDateTime birthDay;

    private boolean enable;
}
