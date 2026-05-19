"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { SubAdminTable } from "@/views/subadmin/components/subadmin-table";
import { AddSubAdminModal } from "@/views/subadmin/components/add-subadmin-modal";
import { DeleteConfirmationModal } from "@/views/subadmin/components/delete-confirmation-modal";
import { SubAdminDetailsModal } from "@/views/subadmin/components/subadmin-details-modal";
import { EditSubAdminModal } from "@/views/subadmin/components/edit-subadmin-modal";
import { subAdminController } from "@/controllers/subadmin.controller";
import { toast } from "sonner"; // Assuming sonner is used for toast notifications
import { PageLoader } from "@/components/ui/loading-spinner";

export default function SubAdminContent() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [selectedSubAdminDetails, setSelectedSubAdminDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [adminsData, permissionsData, rolesData] = await Promise.all([
        subAdminController.getAllSubAdmins(),
        Promise.resolve(subAdminController.getAvailablePermissions()),
        Promise.resolve(subAdminController.getAvailableRoles()),
      ]);
      setSubAdmins(adminsData);
      setPermissions(permissionsData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to fetch sub-admins data');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (adminId) => {
    // Optimistically toggle status locally for an instant sliding animation response
    setSubAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
        : admin
    ));

    try {
      const response = await subAdminController.toggleStatus(adminId);
      if (response && response.success) {
        toast.success(response.message || 'Status updated successfully');
        fetchData(true); // Silent background refresh to sync with server without showing loader
      } else {
        toast.error(response?.message || 'Failed to update status');
        // Revert status on API failure
        setSubAdmins(prev => prev.map(admin => 
          admin.id === adminId 
            ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
            : admin
        ));
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
      // Revert status on network/runtime failure
      setSubAdmins(prev => prev.map(admin => 
        admin.id === adminId 
          ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
          : admin
      ));
    }
  };

  const handleEdit = (admin) => {
    setSelectedSubAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubAdmin = async (adminId, formData) => {
    try {
      const response = await subAdminController.updateSubAdmin(adminId, formData);
      if (response && response.success) {
        toast.success(response.message || 'Sub-admin updated successfully');
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || 'Failed to update sub-admin');
      }
    } catch (error) {
      toast.error('An error occurred while updating sub-admin');
    }
  };



  const handleViewDetails = async (admin) => {
    setSelectedSubAdmin(admin);
    setSelectedSubAdminDetails(admin); // Use table row data as placeholder for immediate open
    setIsDetailsModalOpen(true);
    
    try {
      setDetailsLoading(true);
      const data = await subAdminController.getSubAdminDetails(admin.id);
      if (data) {
        setSelectedSubAdminDetails(data);
      }
    } catch (error) {
      console.error("Failed to fetch sub-admin details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };



  const handleAddSubAdmin = async (formData) => {
    try {
      const response = await subAdminController.createSubAdmin(formData);
      if (response && response.success) {
        toast.success(response.message || 'Sub-admin created successfully');
        setIsAddModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || 'Failed to create sub-admin');
      }
    } catch (error) {
      toast.error('An error occurred during creation');
    }
  };



  const handleDeleteSubAdmin = (admin) => {
    setSelectedSubAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSubAdmin = async () => {
    if (!selectedSubAdmin) return;
    
    try {
      const response = await subAdminController.deleteSubAdmin(selectedSubAdmin.id);
      if (response && response.success) {
        toast.success(response.message || 'Sub-admin deleted successfully');
        setIsDeleteModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || 'Failed to delete sub-admin');
      }
    } catch (error) {
      toast.error('An error occurred while deleting sub-admin');
    }
  };

  if (loading) {
    return <PageLoader message="Fetching sub-admin data..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
            Sub-Admin Role Management
          </h1>
          <p style={{ fontSize: '16px', color: '#666666', marginTop: '8px' }}>
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
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FBBF24'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC107'}
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
          {subAdmins && subAdmins.length > 0 ? (
            <SubAdminTable
              subAdmins={subAdmins}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEdit}
              onViewDetails={handleViewDetails}
              onDelete={handleDeleteSubAdmin}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
              No sub-admins found
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddSubAdminModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        permissions={permissions}
        roles={roles}
        onSubmit={handleAddSubAdmin}
      />

      <EditSubAdminModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        subAdmin={selectedSubAdmin}
        permissions={permissions}
        onSubmit={handleUpdateSubAdmin}
      />



      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={confirmDeleteSubAdmin}
        itemName={selectedSubAdmin?.name}
      />

      <SubAdminDetailsModal
        subAdmin={selectedSubAdminDetails}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
    </div>
  );
}
