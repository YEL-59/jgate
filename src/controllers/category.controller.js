/**
 * Category Controller
 * Business logic for project category management
 */

import { categoryService } from '@/services/category.service';

export const categoryController = {
    /**
     * Get all categories
     */
    async getAllCategories() {
        try {
            return await categoryService.getAllCategories();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * Create a category
     */
    async createCategory(data) {
        try {
            return await categoryService.createCategory(data);
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    /**
     * Update a category
     */
    async updateCategory(id, data) {
        try {
            return await categoryService.updateCategory(id, data);
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    },

    /**
     * Delete a category
     */
    async deleteCategory(id) {
        try {
            return await categoryService.deleteCategory(id);
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    },
};
