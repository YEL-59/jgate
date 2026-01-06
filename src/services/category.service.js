/**
 * Category Service
 * Handles data fetching for project categories
 */

import {
    getProjectCategories,
    createProjectCategory,
    updateProjectCategory,
    deleteProjectCategory
} from "./dashboard/category";

export const categoryService = {
    /**
     * Get all categories
     */
    async getAllCategories() {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const response = await getProjectCategories(token);
        if (response && response.success) {
            return response.data;
        }
        return [];
    },

    /**
     * Create a new category
     */
    async createCategory(data) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await createProjectCategory(token, data);
    },

    /**
     * Update a category
     */
    async updateCategory(id, data) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await updateProjectCategory(token, id, data);
    },

    /**
     * Delete a category
     */
    async deleteCategory(id) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await deleteProjectCategory(token, id);
    }
};
