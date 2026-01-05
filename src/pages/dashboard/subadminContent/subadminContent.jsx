"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { SubAdminTable } from "@/views/subadmin/components/subadmin-table";
import { AddSubAdminModal } from "@/views/subadmin/components/add-subadmin-modal";
import { EditPermissionsModal } from "@/views/subadmin/components/edit-permissions-modal";
import { subAdminController } from "@/controllers/subadmin.controller";

export default function SubAdminContent() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [adminsData, permissionsData] = await Promise.all([
          subAdminController.getAllSubAdmins(),
          Promise.resolve(subAdminController.getAvailablePermissions()),
        ]);
        setSubAdmins(adminsData);
        setPermissions(permissionsData);
      } catch (error) {
        console.error('Failed to fetch sub-admins:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggleStatus = (adminId, newStatus) => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === adminId ? { ...admin, status: newStatus } : admin
      )
    );
    // In a real app, you would call an API here
    console.log(`Toggle admin ${adminId} to ${newStatus}`);
  };

  const handleEditPermissions = (admin) => {
    setSelectedSubAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleAddSubAdmin = (formData) => {
    const newAdmin = {
      id: `SA${String(subAdmins.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      permissions: formData.permissions,
      lastLogin: 'Never',
      status: 'Active',
    };
    setSubAdmins((prev) => [...prev, newAdmin]);
    console.log('Added new sub-admin:', newAdmin);
    // In a real app, you would call an API here
  };

  const handleUpdatePermissions = (adminId, updatedPermissions) => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === adminId ? { ...admin, permissions: updatedPermissions } : admin
      )
    );
    console.log(`Updated permissions for admin ${adminId}:`, updatedPermissions);
    // In a real app, you would call an API here
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ color: '#666666' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
            Sub-Admin Role Management
          </h1>
          <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
            Manage internal team access and permissions
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#FFC107',
            color: '#1a1a1a',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FBBF24';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFC107';
          }}
        >
          <Plus size={18} />
          Add New Sub-Admin
        </button>
      </div>

      {/* Admin Team Members Table */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', margin: 0 }}>
          Admin Team Members
        </h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {subAdmins.length > 0 ? (
            <SubAdminTable
              subAdmins={subAdmins}
              onToggleStatus={handleToggleStatus}
              onEditPermissions={handleEditPermissions}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
              No sub-admins found
            </div>
          )}
        </div>
      </div>

      {/* Add Sub-Admin Modal */}
      <AddSubAdminModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        permissions={permissions}
        onSubmit={handleAddSubAdmin}
      />

      {/* Edit Permissions Modal */}
      <EditPermissionsModal
        subAdmin={selectedSubAdmin}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        permissions={permissions}
        onSubmit={handleUpdatePermissions}
      />
    </div>
  );
}
