package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.CategoryDto;
import com.GDU.backend.models.Category;
import com.GDU.backend.repositories.CategoryRepository;
import com.GDU.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public String insertCategory(CategoryDto categoryDto) {
        Category existingCategory = categoryRepository.findByCategoryName(categoryDto.getCategory_name());
        if (existingCategory != null) {
            return "Category with name " + categoryDto.getCategory_name() + " already exists";
        }
        
        String categorySlug = categoryDto.getCategory_name().replace(" ", "-").toLowerCase();
        Category newCategory = Category
                .builder()
                .categoryName(categoryDto.getCategory_name())
                .categorySlug(categorySlug)
                .build();
        categoryRepository.save(newCategory);
        return "insert category success";
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public String updateCategory(long categoryId, CategoryDto categoryDto) {
        Category existingCategory = getCategoryById(categoryId);
        if (existingCategory == null) {
            return "Category with id " + categoryId + " does not exist";
        }
        
        existingCategory.setCategoryName(categoryDto.getCategory_name());
        categoryRepository.save(existingCategory);
        return "update category success";
    }

    @Override
    public String deleteCategory(long id) {
        Category category = getCategoryById(id);
        if (category == null) {
            return "category not found";
        }
        categoryRepository.deleteById(id);
        return "delete category success";
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
