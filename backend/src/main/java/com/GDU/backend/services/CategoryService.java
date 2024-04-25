package com.GDU.backend.services;

import com.GDU.backend.dtos.CategoryDto;
import com.GDU.backend.models.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    String insertCategory(CategoryDto categoryDto);

    Category getCategoryById(long id);

    String updateCategory(long categoryId, CategoryDto categoryDto);

    String deleteCategory(long id);

    List<Category> findAll();
}
