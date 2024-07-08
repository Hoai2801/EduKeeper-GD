package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.SpecializedDTO;
import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.models.Specialized;

import java.util.List;

public interface SpecializedService {
    List<Specialized> getSpecializes();

    Specialized getSpecializedById(Long s);

    List<SpecializesWithCount> getSpecializedWithCount();

    List<Specialized> getSpecializedByDepartmentId(Long id);

    String updateSpecializedById(Long id, SpecializedDTO specializedDTO);

    String createSpecialized(SpecializedDTO specializedDTO);
}