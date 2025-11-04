/**
 * Static Content Controller
 * Business logic for static content management
 */

import { staticContentService } from '@/services/static-content.service';

export const staticContentController = {
  /**
   * Get all static pages
   */
  getStaticPages() {
    return staticContentService.getStaticPages();
  },

  /**
   * Get page content
   */
  async getPageContent(pageId) {
    try {
      return await staticContentService.getPageContent(pageId);
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  },

  /**
   * Save page content
   */
  async savePageContent(pageId, title, content) {
    try {
      return await staticContentService.savePageContent(pageId, { title, content });
    } catch (error) {
      console.error('Error saving page content:', error);
      throw error;
    }
  },
};

