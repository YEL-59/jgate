/**
 * Project Controller
 * Business logic for project and scene management
 */

import { projectService } from '@/services/project.service';

export const projectController = {
  /**
   * Get all projects
   */
  async getAllProjects() {
    try {
      return await projectService.getAllProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * Get all scenes
   */
  async getAllScenes() {
    try {
      return await projectService.getAllScenes();
    } catch (error) {
      console.error('Error fetching scenes:', error);
      throw error;
    }
  },
};

