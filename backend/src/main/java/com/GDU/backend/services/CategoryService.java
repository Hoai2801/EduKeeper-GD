package com.GDU.backend.services;

import com.GDU.backend.dtos.CategoryDto;
import com.GDU.backend.models.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    Category createCategory(CategoryDto categoryDto);
    Category getCategoryById(long id);
    List<Category> getAllCategories();

    Category updateCategory(long categoryId, CategoryDto categoryDto);

    void deleteCategory(long id);
}
