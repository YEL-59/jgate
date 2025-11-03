"use client";

import {
  LayoutDashboard,
  Users,
  Film,
  UserCog,
  Bell,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItems } from "@/models/menu.model";
import { theme } from "@/config/theme.config";

// Icon mapping
const iconMap = {
  LayoutDashboard,
  Users,
  Film,
  UserCog,
  Bell,
  FileText,
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  };

  return (
    <Sidebar className="border-0 border-r-0">
      <SidebarHeader className="px-4 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.sidebar.active }}
          >
            <span className="text-xl font-bold" style={{ color: theme.colors.sidebar.background }}>
              {theme.brand.logo}
            </span>
          </div>
          <h1 className="text-xl font-semibold text-sidebar-foreground">
            {theme.brand.name}
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`group relative ${
                        isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : ''
                      }`}
                    >
                      <Link href={item.href}>
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full justify-start hover:bg-sidebar-accent"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

