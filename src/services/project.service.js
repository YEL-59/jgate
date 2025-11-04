/**
 * Project Service
 * Handles data fetching for projects and scenes
 */

export const projectService = {
  /**
   * Get all projects
   */
  async getAllProjects() {
    // Simulate API call
    return [
      { 
        id: 'P001', 
        title: 'Urban Drama Casting', 
        director: 'Emma Wilson', 
        status: 'Published', 
        created: '2024-08-15',
        genre: 'Drama',
        description: 'Looking for talented actors for an exciting new project. Multiple roles available.'
      },
      { 
        id: 'P002', 
        title: 'Sci-Fi Feature Film', 
        director: 'Emma Wilson', 
        status: 'Draft', 
        created: '2024-11-01',
        genre: 'Science Fiction',
        description: 'A futuristic adventure exploring themes of technology and humanity.'
      },
      { 
        id: 'P003', 
        title: 'Romantic Comedy Lead', 
        director: 'Sarah Davis', 
        status: 'Published', 
        created: '2024-09-30',
        genre: 'Romance',
        description: 'Seeking charismatic leads for a heartwarming romantic comedy.'
      },
      { 
        id: 'P004', 
        title: 'Thriller Short Film', 
        director: 'Emma Wilson', 
        status: 'Closed', 
        created: '2024-07-10',
        genre: 'Thriller',
        description: 'A suspenseful short film that keeps audiences on the edge of their seats.'
      },
    ];
  },

  /**
   * Get all scenes
   */
  async getAllScenes() {
    // Simulate API call
    return [
      { 
        id: 'S001', 
        title: 'Avengers: Endgame', 
        actor: 'John Smith', 
        rating: 8.5, 
        uploadDate: '2024-09-30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      { 
        id: 'S002', 
        title: 'Action Scene - Spy Thriller', 
        actor: 'Michael Baron', 
        rating: 7.9, 
        uploadDate: '2024-09-22',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      },
      { 
        id: 'S003', 
        title: 'Comedy Sketch - Office', 
        actor: 'Lisa Anderson', 
        rating: 8.2, 
        uploadDate: '2024-09-21',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      { 
        id: 'S004', 
        title: 'Emotional Scene - Family Drama', 
        actor: 'John Smith', 
        rating: 6.9, 
        uploadDate: '2024-09-28',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
      },
      { 
        id: 'S005', 
        title: 'Dance Performance', 
        actor: 'Lisa Anderson', 
        rating: 7.5, 
        uploadDate: '2024-10-02',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
      },
    ];
  },
};

