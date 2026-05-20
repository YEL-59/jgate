"use client";

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditSubAdminModal({ open, onOpenChange, subAdmin, permissions = [], onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_name: '',
    status: '1', // "1" or "0"
    permissions: [], // array of permission IDs
  });

  // Load sub-admin details when modal opens
  useEffect(() => {
    if (subAdmin && open) {
      const initialPermissionIds = subAdmin.permissions 
        ? subAdmin.permissions.map(p => p.id) 
        : [];
      
      const roleName = subAdmin.roles && subAdmin.roles.length > 0 
        ? subAdmin.roles[0].name 
        : '';

      setFormData({
        name: subAdmin.name || '',
        email: subAdmin.email || '',
        role_name: roleName || '',
        status: subAdmin.status === 'Active' ? '1' : '0',
        permissions: initialPermissionIds,
      });
    }
  }, [subAdmin, open]);

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionId],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => id !== permissionId),
      }));
    }
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === '1' ? '0' : '1',
    }));
  };

  const handleSubmit = () => {
    if (!formData.name) {
      // alert('Please enter a name');
      toast.error('Please enter a name');
      return;
    }
    onSubmit(subAdmin.id, formData);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            Edit Sub-Admin Details
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Modify sub-admin access settings, name, status, and permissions.
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '12px 0' }}>
          {/* Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Naeem"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#ffffff',
              }}
            />
          </div>

          {/* Email (Disabled / Read-only) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af', marginBottom: '6px', display: 'block' }}>
              Email Address (Cannot Update)
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                outline: 'none',
              }}
            />
          </div>

          {/* Role Name (Disabled / Read-only) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af', marginBottom: '6px', display: 'block' }}>
              Role Name (Cannot Update)
            </label>
            <input
              type="text"
              value={formData.role_name}
              disabled
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                outline: 'none',
              }}
            />
          </div>

          {/* Status (1/0 Toggle switch) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#374151' }}>
                Account Status
              </span>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
                Toggle active or inactive login state for this sub-admin.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Sliding switch */}
              <button
                onClick={handleStatusToggle}
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: formData.status === '1' ? '#10B981' : '#D1D5DB',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  outline: 'none',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transform: formData.status === '1' ? 'translateX(22px)' : 'translateX(4px)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </button>
              
              {/* status pill label */}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: formData.status === '1' ? '#047857' : '#4B5563',
                  backgroundColor: formData.status === '1' ? '#D1FAE5' : '#F3F4F6',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  minWidth: '60px',
                  textAlign: 'center',
                }}
              >
                {formData.status === '1' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '10px', display: 'block' }}>
              Update Permissions
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '10px',
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
            }}>
              {permissions && permissions.map((permission) => (
                <label
                  key={permission.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#4b5563', fontWeight: '500' }}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#4f46e5' }}
                  />
                  <span>{permission.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <Button variant="outline" onClick={handleClose} className="hover:bg-gray-100 rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#FFC107',
              color: '#1a1a1a',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="hover:bg-yellow-500 rounded-xl"
          >
            <Save size={16} />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
