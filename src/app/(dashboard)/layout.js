"use client";

import { DashboardSidebar } from "@/views/components/dashboard-sidebar";
import { DashboardNavbar } from "@/views/components/dashboard-navbar";
import { theme } from "@/config/theme.config";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardLayout({ children }) {
  const isMobile = useIsMobile();

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.colors.dashboard.background,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    }}>
      <DashboardSidebar />
      <main style={{
        flex: 1,
        backgroundColor: theme.colors.dashboard.background,
        padding: isMobile ? '60px 16px 16px' : '32px 24px',
        overflow: 'auto',
        width: '100%',
        minHeight: '100vh',
      }}>
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
}

