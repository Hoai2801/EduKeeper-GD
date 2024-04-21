package com.GDU.backend.dtos.response;

import com.GDU.backend.models.Specialized;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DepartmentResponse {
    private Long id;

    private String departmentName;

    private List<Specialized> specializeds;
}
