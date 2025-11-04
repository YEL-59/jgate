/**
 * Static Content Service
 * Handles data fetching for static content pages
 */

export const staticContentService = {
  /**
   * Get all static pages
   */
  getStaticPages() {
    return [
      { id: 'about_us', title: 'About Us' },
      { id: 'terms_of_service', title: 'Terms of Service' },
      { id: 'privacy_policy', title: 'Privacy Policy' },
      { id: 'faq', title: 'Frequently Asked Questions' },
      { id: 'help_center', title: 'Help Center' },
      { id: 'contact_us', title: 'Contact Us' },
    ];
  },

  /**
   * Get page content by ID
   */
  async getPageContent(pageId) {
    // Simulate API call
    const defaultContent = {
      about_us: {
        id: 'about_us',
        title: 'About Us',
        content: 'Welcome to our platform. We connect talented actors with visionary directors to create amazing content. Our mission is to democratize the casting process and provide opportunities for aspiring performers worldwide.',
      },
      terms_of_service: {
        id: 'terms_of_service',
        title: 'Terms of Service',
        content: '<h1>Terms of Service</h1><p>Please read these terms carefully before using our platform...</p>',
      },
      privacy_policy: {
        id: 'privacy_policy',
        title: 'Privacy Policy',
        content: '<h1>Privacy Policy</h1><p>Your privacy is important to us. This policy explains how we collect and use your information...</p>',
      },
      faq: {
        id: 'faq',
        title: 'Frequently Asked Questions',
        content: '<h1>Frequently Asked Questions</h1><p>Find answers to common questions about our platform...</p>',
      },
      help_center: {
        id: 'help_center',
        title: 'Help Center',
        content: '<h1>Help Center</h1><p>Get help and support for using our platform...</p>',
      },
      contact_us: {
        id: 'contact_us',
        title: 'Contact Us',
        content: '<h1>Contact Us</h1><p>Get in touch with our team...</p>',
      },
    };

    return defaultContent[pageId] || defaultContent.about_us;
  },

  /**
   * Save page content
   */
  async savePageContent(pageId, content) {
    // Simulate API call
    console.log('Saving content for page:', pageId, content);
    return { success: true };
  },
};

