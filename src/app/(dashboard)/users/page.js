"use client";

import { useState, useEffect } from "react";
import { UserTabs } from "@/views/users/components/user-tabs";
import { UserSearch } from "@/views/users/components/user-search";
import { UserTable } from "@/views/users/components/user-table";
import { userController } from "@/controllers/user.controller";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [allUsers, setAllUsers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'approvals', label: 'Director Approval Queue' },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [users, approvals] = await Promise.all([
          userController.getAllUsers(),
          userController.getPendingDirectorApprovals(),
        ]);
        setAllUsers(users);
        setPendingApprovals(approvals);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, activeTab, allUsers, pendingApprovals]);

  const handleToggleStatus = (userId, newStatus) => {
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    // In a real app, you would call an API here
    console.log(`Toggle user ${userId} to ${newStatus}`);
  };

  const handleApprove = (userId) => {
    // Remove from pending approvals and add to all users
    setPendingApprovals((prev) => prev.filter((user) => user.id !== userId));
    // In a real app, you would call an API here
    console.log(`Approve user ${userId}`);
  };

  const handleReject = (userId) => {
    // Remove from pending approvals
    setPendingApprovals((prev) => prev.filter((user) => user.id !== userId));
    // In a real app, you would call an API here
    console.log(`Reject user ${userId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ color: '#666666' }}>Loading users...</div>
      </div>
    );
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






