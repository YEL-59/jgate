/**
 * Menu Model
 * Defines the structure for navigation menu items
 */

export const MenuItem = {
  DASHBOARD: 'dashboard',
  USER_MANAGEMENT: 'user-management',
  PROJECTS_SCENES: 'projects-scenes',
  SUB_ADMIN_ROLES: 'sub-admin-roles',
  NOTIFICATIONS: 'notifications',
  STATIC_CONTENT: 'static-content',
  CATEGORY: 'category',
  MOVIE_LIBRARY: 'movie-library',
};

/**
 * Menu Items Configuration
 * Defines navigation menu items with their properties
 */
export const menuItems = [
  {
    id: MenuItem.DASHBOARD,
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: MenuItem.USER_MANAGEMENT,
    title: 'User Management',
    href: '/dashboard/users',
    icon: 'Users',
  },
  {
    id: MenuItem.PROJECTS_SCENES,
    title: 'Projects & Scenes',
    href: '/dashboard/projects',
    icon: 'Film',
  },
  {
    id: MenuItem.SUB_ADMIN_ROLES,
    title: 'Sub-Admin Roles',
    href: '/dashboard/sub-admin',
    icon: 'UserCog',
  },
  {
    id: MenuItem.NOTIFICATIONS,
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: 'Bell',
  },
  {
    id: MenuItem.STATIC_CONTENT,
    title: 'Static Content',
    href: '/dashboard/static-content',
    icon: 'FileText',
  },
  {
    id: MenuItem.CATEGORY,
    title: 'Category',
    href: '/dashboard/category',
    icon: 'CloudCog',
  },
  {
    id: MenuItem.MOVIE_LIBRARY,
    title: 'Movie Library',
    href: '/dashboard/movie-library',
    icon: 'Movie',
  },
];

