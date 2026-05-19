"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, ChevronDown, ShieldCheck, Mail, Calendar } from "lucide-react";
import { theme } from "@/config/theme.config";
import { getAdminProfile, updateAdminProfile } from "@/services/dashboard/dashboard";
import { logoutUser } from "@/services/auth/auth";
import { EditProfileModal } from "./edit-profile-modal";
import { toast } from "sonner";

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleUpdateProfile = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await updateAdminProfile(token, formData);
        if (res && res.success) {
          toast.success(res.message || "Profile updated successfully!");
          
          // Re-fetch active details to synchronize UI name immediately
          const latest = await getAdminProfile(token);
          if (latest && latest.success && latest.data?.user) {
            setProfile(latest.data.user);
            localStorage.setItem("user", JSON.stringify(latest.data.user));
          }
        } else {
          toast.error(res?.message || "Failed to update profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred during profile update");
    }
  };

  // Parse path for breadcrumbs or section title
  const getSectionTitle = () => {
    if (pathname === "/dashboard" || pathname === "/dashboard/") return "Dashboard Overview";
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Dashboard";
    
    // Map page paths to highly polished page titles
    const routeTitles = {
      'users': 'User Management',
      'projects': 'Projects & Scenes',
      'sub-admin': 'Sub Admin Management',
      'notifications': 'Notification Center',
      'static-content': 'Static Content Management',
      'category': 'Category Management',
      'movie-library': 'Movie Library',
      'mail-settings': 'Mail & System Settings',
    };

    const key = parts[parts.length - 1];
    return routeTitles[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  // Fetch admin profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getAdminProfile(token);
          if (res && res.success && res.data?.user) {
            setProfile(res.data.user);
          } else {
            // Fallback to local storage user if API call failed
            const localUser = localStorage.getItem("user");
            if (localUser) {
              setProfile(JSON.parse(localUser));
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Close dropdown on click-away
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logoutUser(token);
      } catch (error) {
        console.error("Logout API failed:", error);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push('/login');
  };

  // Resolve user info (with fallbacks if profile hasn't finished loading)
  const displayName = profile?.name || "Admin User";
  const displayEmail = profile?.email || "admin@system.com";
  const initials = displayName.charAt(0).toUpperCase();

  // Soft capsule badges styling
  const roleName = profile?.roles?.[0]?.name || "Staff";

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        marginBottom: '28px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* Title */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: '700',
            color: '#1e1b4b',
            letterSpacing: '-0.02em',
          }}
        >
          {getSectionTitle()}
        </h1>
      </div>

      {/* Admin Profile Section */}
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 12px 6px 6px',
            borderRadius: '9999px',
            backgroundColor: '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: dropdownOpen ? '1px solid #FFC107' : '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#282870',
              color: '#FFC107',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 2px 5px rgba(40,40,112,0.2)',
            }}
          >
            {initials}
          </div>

          {/* User Name & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', lineHeight: '1.2' }}>
              {displayName}
            </span>
            <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>
              {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
            </span>
          </div>

          <ChevronDown
            size={16}
            style={{
              color: '#6b7280',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '10px',
              width: '280px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              animation: 'fadeInUp 0.15s ease-out forwards',
              zIndex: 9999,
            }}
          >
            {/* Header info */}
            <div
              style={{
                padding: '20px',
                borderBottom: '1px solid #f3f4f6',
                background: 'linear-gradient(135deg, #282870 0%, #3b3b98 100%)',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#FFC107',
                    color: '#282870',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '20px',
                  }}
                >
                  {initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>
                    {displayName}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#FFC107',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {roleName}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile fields */}
            <div style={{ padding: '12px 8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#4b5563',
                }}
              >
                <Mail size={16} style={{ color: '#9ca3af' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayEmail}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#4b5563',
                }}
              >
                <ShieldCheck size={16} style={{ color: '#10b981' }} />
                <span>
                  Status: <strong style={{ color: '#10b981' }}>Active</strong>
                </span>
              </div>

              <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>
              
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setProfileModalOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <User size={16} style={{ color: '#4b5563' }} />
                Edit Profile Details
              </button>
            </div>

            {/* Logout button */}
            <div style={{ padding: '8px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb' }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fecaca';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <EditProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        profile={profile}
        onSubmit={handleUpdateProfile}
      />
    </header>
  );
}
