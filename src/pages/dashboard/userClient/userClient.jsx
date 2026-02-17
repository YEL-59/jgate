"use client";

import { useState, useEffect } from "react";
import { UserTabs } from "@/views/users/components/user-tabs";
import { UserSearch } from "@/views/users/components/user-search";
import { UserTable } from "@/views/users/components/user-table";
import { userController } from "@/controllers/user.controller";
import { updateUserStatus, getPendingDirectors, approveDirector, rejectDirector } from "@/services/dashboard/user";
import { PageLoader } from "@/components/ui/loading-spinner";

export default function UserClient({ users, loading }) {
  const [activeTab, setActiveTab] = useState('all');
  const [allUsers, setAllUsers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'approvals', label: 'Director Approval Queue' },
  ];

  useEffect(() => {
    if (activeTab === 'approvals') {
        const fetchPending = async () => {
            const token = localStorage.getItem("token");
            if(token) {
                 const res = await getPendingDirectors(token);
                 if (res?.success) {
                     setPendingApprovals(res.data.data);
                     setFilteredUsers(res.data.data);
                 }
            }
        }
        fetchPending();
    } else {
        if (users) {
            setAllUsers(users);
            setFilteredUsers(users);
        }
    }
  }, [users, activeTab]);

  // Filter users based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(activeTab === 'all' ? allUsers : pendingApprovals);
      return;
    }

    const query = searchQuery.toLowerCase();
    const usersToFilter = activeTab === 'all' ? allUsers : pendingApprovals;
    const filtered = usersToFilter.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        String(user.id).toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, activeTab, allUsers, pendingApprovals]);

  const handleToggleStatus = async (userId, newStatus) => {
    // Optimistic update
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    // API Call
    try {
        const token = localStorage.getItem("token");
        const statusValue = newStatus === 'Active' ? 1 : 0;
        const response = await updateUserStatus(token, userId, statusValue);
        
        if (response?.success) {
            // Ensure consistency with API data
            const updatedUserStatus = response.data.data.status == 1 ? "Active" : "Inactive";
             setAllUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, status: updatedUserStatus } : user
                )
             );
        } else {
            // Revert on failure
             setAllUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, status: newStatus === 'Active' ? 'Inactive' : 'Active' } : user
                )
            );
            console.error("Failed to update status");
        }
    } catch (error) {
        console.error("Error updating status:", error);
         // Revert on error
         setAllUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, status: newStatus === 'Active' ? 'Inactive' : 'Active' } : user
            )
        );
    }
  };

  const handleApprove = async (userId) => {
    // Optimistic update
    setPendingApprovals((prev) => prev.filter((user) => user.id !== userId));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
    
    try {
        const token = localStorage.getItem("token");
        const res = await approveDirector(token, userId);
        if (res?.success) {
            console.log("Director approved:", userId);
        } else {
             // Revert if failed (requires fetching again or keeping local backup, simpler to just log for now)
             console.error("Failed to approve director");
        }
    } catch (err) {
        console.error("Error approving director:", err);
    }
  };

  const handleReject = async (userId) => {
    // Optimistic update
    setPendingApprovals((prev) => prev.filter((user) => user.id !== userId));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));

     try {
        const token = localStorage.getItem("token");
        const res = await rejectDirector(token, userId);
        if (res?.success) {
            console.log("Director rejected:", userId);
        } else {
             console.error("Failed to reject director");
        }
    } catch (err) {
        console.error("Error rejecting director:", err);
    }
  };

  if (loading) {
    return <PageLoader message="Fetching user management data..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
          User Management
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
          Manage actors and directors across the platform
        </p>
      </div>

      {/* Tabs */}
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {/* Content */}
      {activeTab === 'all' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>All Users</h2>
            <UserSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <UserTable
              users={filteredUsers}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', margin: 0 }}>
            Pending Director Approvals
          </h2>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {filteredUsers.length > 0 ? (
              <UserTable
                users={filteredUsers}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                No pending approvals
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


