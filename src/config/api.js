// API Configuration for Next.js
// Use NEXT_PUBLIC_* prefix for client-side accessible variables

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://dashboard.theakktricks.net/api";

export const apiConfig = {
  baseURL: API_BASE_URL,

  // API Endpoints
  endpoints: {
    // Authentication
    login: "/admin-login",
    logout: "/logout",

    // Dashboard
    dashboardUser: "/home-dashboard/user",
    adminProfile: "/admin-profile",
    adminProfileUpdate: "/admin-profile-update",

    // User Management
    users: "/user-management",
    userUpdateStatus: (id) => `/user-management/updateStatus/${id}`,
    pendingDirectors: "/user-management/pending-directors",
    approveDirector: (id) => `/user-management/approve-director/${id}`,
    rejectDirector: (id) => `/user-management/reject-director/${id}`,
    userDetails: (id) => `/user-management/show/${id}`,

    // Movies
    movies: "/movies",
    movieById: (id) => `/movies/${id}`,
    adminAllMovies: "/get-admin-all-movie",
    createMovie: "/movie-library-store",
    updateMovie: (id) => `/movie-library-update/${id}`,
    deleteMovie: (id) => `/movie-library-delete/${id}`,

    // Projects
    projects: "/projects",
    projectById: (id) => `/projects/${id}`,
    scenes: "/scenes",
    sceneById: (id) => `/scenes/${id}`,
    adminAllProjects: "/admin/all-project",
    adminProjectDetails: (id) => `/admin/project/show/${id}`,
    adminProjectUpdate: (id) => `/admin/project/update/${id}`,
    adminProjectDelete: (id) => `/admin/project/delete/${id}`,
    adminAllScenes: "/admin/all-scene",
    adminSceneDetails: (id) => `/admin/scene/show/${id}`,
    adminSceneDelete: (id) => `/admin/scene/delete/${id}`,

    // Categories
    categories: "/categories",
    projectCategories: "/project-category",
    projectCategoryCreate: "/project-category/create",
    projectCategoryUpdate: (id) => `/project-category/update/${id}`,
    projectCategoryDelete: (id) => `/project-category/delete/${id}`,

    // FAQ & Help Center
    faq: "/admin/faq",
    faqById: (id) => `/admin/faq/${id}`,
    faqStatus: (id) => `/admin/faq/status/${id}`,
    helpCenter: "/admin/help-center",
    helpCenterById: (id) => `/admin/help-center/${id}`,
    helpCenterStatus: (id) => `/admin/help-center/status/${id}`,

    // Static Content
    staticContent: (type) => `/static-page?type=${type}`,
    contactUs: "/admin/contact-us",

    // Mail Settings
    mailSettings: "/mail-settings",

    // Notifications
    sendNotification: "/send-notification",
  },
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add Authorization header if token exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default apiConfig;
