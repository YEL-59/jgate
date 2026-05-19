"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Film,
  UserCog,
  Bell,
  FileText,
  LogOut,
  Menu,
  X,
  CloudCog,
  Mail,
} from "lucide-react";
import { menuItems } from "@/models/menu.model";
import { theme } from "@/config/theme.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { logoutUser } from "@/services/auth/auth";

// Icon mapping
const iconMap = {
  LayoutDashboard,
  Users,
  Film,
  UserCog,
  Bell,
  FileText,
  CloudCog,
  Mail,
  Movie: Film, // Map 'Movie' to 'Film' icon
};

const permissionMapping = {
  'user-management': ['User Management'],
  'projects-scenes': ['Project & Scene Management'],
  'sub-admin-roles': ['Sub Admin Management'],
  'notifications': ['Notification Management'],
  'static-content': ['Static Content Management'],
  'category': ['Category Management'],
  'movie-library': ['Movie Library Management'],
  'mail-settings': ['Setting Management'],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieVal = parts.pop().split(';').shift();
      return decodeURIComponent(cookieVal);
    }
    return null;
  };

  const getUserData = () => {
    // 1. Try to read from cookies (handles cookie login setups)
    const cookieNames = ['user', 'user_info', 'login_info', 'permissions'];
    for (const name of cookieNames) {
      const cookieVal = getCookie(name);
      if (cookieVal) {
        try {
          const trimmed = cookieVal.trim();
          if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            return JSON.parse(trimmed);
          }
        } catch (e) {
          console.error(`Error parsing cookie ${name}:`, e);
        }
      }
    }

    // 2. Fallback to localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      }
    }
    return null;
  };

  const [user, setUser] = useState(() => {
    return getUserData();
  });

  // Client-side synchronization to prevent SSR mismatch while loading updates
  useEffect(() => {
    const resolvedUser = getUserData();
    if (resolvedUser) {
      setUser(resolvedUser);
    }
  }, []);

  const hasPermission = (item) => {
    // 1. Dashboard is always visible to everyone
    if (item.id === 'dashboard') return true;

    // 2. If no user is parsed yet, show it (prevents visual flicker)
    if (!user) return true;

    // 3. Super Admin Role Bypass (sees everything)
    // Supports: roles: ["super admin"] (string array) or roles: [{name: "super admin"}] (object array)
    const roles = user.roles || [];
    const isSuperAdmin = roles.some(role => {
      const name = (typeof role === 'string' ? role : (role.name || '')).toLowerCase();
      return name === 'super admin' || name === 'superadmin' || name === 'admin' || name === 'owner';
    });
    if (isSuperAdmin) return true;

    // 4. Extract Permissions safely (supports Spatie string arrays OR active object lists)
    const userPermissions = user.permissions || user.all_permissions || [];
    const permissionNames = userPermissions.map(p => {
      if (typeof p === 'string') return p.toLowerCase();
      if (p && typeof p === 'object') {
        return (p.permission || p.name || '').toLowerCase();
      }
      return '';
    }).filter(Boolean);

    const requiredPermissions = permissionMapping[item.id] || [];
    if (requiredPermissions.length === 0) return true;

    // 5. Intelligent Matcher (Exact match, Substring match, or Stripped Alphanumeric match)
    return requiredPermissions.some(reqPerm => {
      const reqLower = reqPerm.toLowerCase();
      return permissionNames.some(userPerm => {
        // Direct match
        if (userPerm === reqLower) return true;
        
        // Substring check
        if (userPerm.includes(reqLower) || reqLower.includes(userPerm)) return true;
        
        // Strip out non-alphanumeric chars (e.g. space, &, -, _) to match cleanly
        const stripStr = (s) => s.replace(/[^a-z0-9]/g, '');
        if (stripStr(userPerm) === stripStr(reqLower)) return true;

        return false;
      });
    });
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await logoutUser(token);
        console.log("chape backend:", res);
      } catch (error) {
        console.error("Logout API failed:", error);
      }
    }
    
    // Always clear local storage and redirect, even if the API call fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar content component
  const SidebarContent = () => (
    <>
      {/* Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: `1px solid ${theme.colors.sidebar.border || 'rgba(255, 255, 255, 0.1)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: theme.colors.sidebar.active,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.sidebar.background,
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {theme.brand.logo}
          </div>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: theme.colors.sidebar.foreground,
              margin: 0,
            }}
          >
            {theme.brand.name}
          </h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {menuItems.filter(hasPermission).map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          // For Dashboard, only match exact path. For other routes, match exact or child routes
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard' || pathname === '/dashboard/'
            : pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '4px',
                borderRadius: '8px',
                textDecoration: 'none',
                backgroundColor: isActive ? theme.colors.sidebar.active : 'transparent',
                color: isActive ? theme.colors.sidebar.background : theme.colors.sidebar.foreground,
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={20} />
              <span style={{ fontSize: '14px' }}>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer - Logout */}
      <div
        style={{
          padding: '16px 12px',
          borderTop: `1px solid ${theme.colors.sidebar.border || 'rgba(255, 255, 255, 0.1)'}`,
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.colors.sidebar.foreground,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  // Mobile view with overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1001,
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: theme.colors.sidebar.background,
            border: 'none',
            color: theme.colors.sidebar.foreground,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Sidebar */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '280px',
            maxWidth: '85vw',
            backgroundColor: theme.colors.sidebar.background,
            display: 'flex',
            flexDirection: 'column',
            color: theme.colors.sidebar.foreground,
            zIndex: 1000,
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            boxShadow: isOpen ? '2px 0 8px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          <SidebarContent />
        </div>
      </>
    );
  }

  // Desktop view
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: theme.colors.sidebar.background,
        display: 'flex',
        flexDirection: 'column',
        color: theme.colors.sidebar.foreground,
      }}
    >
      <SidebarContent />
    </div>
  );
}

