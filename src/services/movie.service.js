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
    async getAllMovies() {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const response = await getAdminAllMovies(token);
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
        return await createMovie(token, data);
    },

    /**
     * Update a movie
     */
    async updateMovie(id, data) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await updateMovie(token, id, data);
    },

    /**
     * Delete a movie
     */
    async deleteMovie(id) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return await deleteMovie(token, id);
    }
};
