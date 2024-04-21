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
        String categorySlug = categoryDto.getCategory_name().replace(" ", "-").toLowerCase();
        Category newCategory = Category
                .builder()
                .categoryName(categoryDto.getCategory_name())
                .categorySlug(categorySlug)
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
        existingCategory.setCategoryName(categoryDto.getCategory_name());
        categoryRepo.save(existingCategory);
        return existingCategory;
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepo.deleteById(id);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }
}
