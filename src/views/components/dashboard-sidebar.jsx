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
} from "lucide-react";
import { menuItems } from "@/models/menu.model";
import { theme } from "@/config/theme.config";
import { useIsMobile } from "@/hooks/use-mobile";

// Icon mapping
const iconMap = {
  LayoutDashboard,
  Users,
  Film,
  UserCog,
  Bell,
  FileText,
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const handleLogout = () => {
    // Add logout logic here
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
        {menuItems.map((item) => {
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

