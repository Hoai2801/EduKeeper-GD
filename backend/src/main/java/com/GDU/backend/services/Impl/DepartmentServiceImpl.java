package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.dtos.response.DepartmentResponse;
import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.DepartmentRepository;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final SpecializedRepository specializedRepository;

    @Override
    public List<Department> getDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments;
//        return departments.stream().map(department -> {
//            List<Specialized> specializeds = specializedRepository.getSpecializedsByDepartmentId(department.getId());
//            return DepartmentResponse.builder()
//                    .departmentName(department.getDepartmentName())
//                    .id(department.getId())
//                    .specializeds(specializeds)
//                    .build();
//        }).toList();
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
    }

    @Override
    public Department getDepartmentByName(String name) {
        return departmentRepository.findByDepartmentName(name);
    }

    @Override
    public String createDepartment(DepartmentDTO departmentDTO) {
        try {
            Department newDepartment = Department.builder().departmentName(departmentDTO.getDepartmentName())
                    .departmentSlug(departmentDTO.getDepartmentName().replace(" ", "-").toLowerCase()).build();
            departmentRepository.save(newDepartment);
            return "Create department success";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'createDepartment'" + e.getMessage());
        }
    }

    @Override
    public String updateDepartmentById(Long id, DepartmentDTO departmentDTO) {
        try {
            Department existDepartment = departmentRepository.findById(id).orElse(null);
            if (existDepartment == null) {
                return "Department no exist";
            }
            existDepartment.setDepartmentName(departmentDTO.getDepartmentName());
            existDepartment.setDepartmentSlug(departmentDTO.getDepartmentName().replace(" ", "-").toLowerCase());
            departmentRepository.save(existDepartment);
            return "Update department success";
        } catch (Exception e) {
            throw new UnsupportedOperationException(
                    "Unimplemented method 'updateDepartmentById'" + e.getLocalizedMessage());
        }
    }

    @Override
    public String deleteDepartmentById(Long id) {
        try {
            departmentRepository.deleteById(id);
            return "Delete department success";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'deleteDepartmentById'" + e.getMessage());
        }
    }
}
