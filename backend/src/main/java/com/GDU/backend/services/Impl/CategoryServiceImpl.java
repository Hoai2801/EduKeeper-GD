package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.CategoryDto;
import com.GDU.backend.models.Category;
import com.GDU.backend.repositories.CategoryRepo;
import com.GDU.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepo categoryRepo;
    @Override
    public Category createCategory(CategoryDto categoryDto) {
        Category newCategory = Category
                .builder()
                .category_name(categoryDto.getCategory_name())
                .build();
        return categoryRepo.save(newCategory);
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public Category updateCategory(long categoryId, CategoryDto categoryDto) {
        Category existingCategory = getCategoryById(categoryId);
        existingCategory.setCategory_name(categoryDto.getCategory_name());
        categoryRepo.save(existingCategory);
        return existingCategory;
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepo.deleteById(id);
    }
}
