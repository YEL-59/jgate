/**
 * Movie Controller
 * Business logic for movie library management
 */

import { movieService } from '@/services/movie.service';

export const movieController = {
    /**
     * Get all movies
     */
    async getAllMovies() {
        try {
            return await movieService.getAllMovies();
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    },

    /**
     * Create a movie
     */
    async createMovie(data) {
        try {
            return await movieService.createMovie(data);
        } catch (error) {
            console.error('Error creating movie:', error);
            throw error;
        }
    },

    /**
     * Update a movie
     */
    async updateMovie(id, data) {
        try {
            return await movieService.updateMovie(id, data);
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error;
        }
    },

    /**
     * Delete a movie
     */
    async deleteMovie(id) {
        try {
            return await movieService.deleteMovie(id);
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw error;
        }
    },
};
