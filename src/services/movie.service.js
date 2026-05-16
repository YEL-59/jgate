/**
 * Movie Service
 * Handles data fetching for movie library
 */

import {
    getAdminAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
} from "./dashboard/movie";

export const movieService = {
    /**
     * Get all movies
     */
    async getAllMovies(page = 1) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const response = await getAdminAllMovies(token, page);
        if (response && response.success) {
            return response.data;
        }
        return [];
    },

    /**
     * Create a new movie
     */
    async createMovie(data) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        if (data instanceof FormData) {
            data.append("token", token);
            return await createMovie(data);
        }
        return { success: false, message: "Invalid payload format" };
    },

    /**
     * Update a movie
     */
    async updateMovie(id, data) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        if (data instanceof FormData) {
            data.append("token", token);
            data.append("id", id);
            return await updateMovie(data);
        }
        return { success: false, message: "Invalid payload format" };
    },

    /**
     * Delete a movie
     */
    async deleteMovie(id) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await deleteMovie(token, id);
    }
};
