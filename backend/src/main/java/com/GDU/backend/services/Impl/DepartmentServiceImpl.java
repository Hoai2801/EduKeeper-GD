package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.DepartmentRepository;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final SpecializedRepository specializedRepository;

    @Override
    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public ResponseEntity<String> createDepartment(DepartmentDTO departmentDTO) {
        try {
            Department departmentName = departmentRepository.getDepartmentByName(
                    departmentDTO.getDepartmentName()
            );
            if (departmentName != null) {
                return ResponseEntity.badRequest().body("Khoa đã tồn tại");
            }
            Department newDepartment = Department.builder()
                    .departmentName(departmentDTO.getDepartmentName())
                    .departmentSlug(departmentDTO.getDepartmentName()
                                    .replace(" ", "-")
                                    .toLowerCase())
                    .build();
            departmentRepository.save(newDepartment);
            return ResponseEntity.ok("Tạo khoa mới thành công");
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'createDepartment'" + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> updateDepartmentById(Long id, DepartmentDTO departmentDTO) {
        try {
            Department existDepartment = departmentRepository.findById(id).orElse(null);
            if (existDepartment == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy khoa này");
            }
            existDepartment.setDepartmentName(departmentDTO.getDepartmentName());
            existDepartment.setDepartmentSlug(
                    departmentDTO.getDepartmentName().replace(" ", "-").toLowerCase());
            departmentRepository.save(existDepartment);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            throw new UnsupportedOperationException(
                    "Unimplemented method 'updateDepartmentById'" + e.getLocalizedMessage()
            );
        }
    }

    @Override
    public ResponseEntity<String> deleteDepartmentById(Long id) {
        try {
            Department existDepartment = departmentRepository.findById(id).orElse(null);
            if (existDepartment == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy khoa này");
            }
            // get all specialized of department to remove
            List<Specialized> specializedList = departmentRepository.getSpecializedByDepartmentId(id);
            if (!specializedList.isEmpty()) {
                return ResponseEntity.badRequest().body("Khoa này đang được sử dụng");
            }
            specializedRepository.deleteAll(specializedList);
            departmentRepository.delete(existDepartment);
            return ResponseEntity.ok("Xoá thành công");
        } catch (Exception e) {
            throw new UnsupportedOperationException(
                    "Unimplemented method 'deleteDepartmentById'" + e.getMessage()
            );
        }
    }

    @Override
    public ResponseEntity<String> lockDepartmentById(Long id) {
        try {
            Department existDepartment = departmentRepository.findById(id).orElse(null);
            if (existDepartment == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy khoa này");
            }
            if (existDepartment.isLocked()) {
                existDepartment.setLocked(false);
                departmentRepository.save(existDepartment);
                return ResponseEntity.ok("Mở khóa khoa thành công");
            }
            existDepartment.setLocked(true);
            departmentRepository.save(existDepartment);
            return ResponseEntity.ok("Khoá khoa thành công");
        } catch (Exception e) {
            throw new UnsupportedOperationException(
                    "Unimplemented method 'lockDepartmentById'" + e.getMessage()
            );
        }
    }
}
