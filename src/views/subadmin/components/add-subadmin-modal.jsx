"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
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

export function AddSubAdminModal({ open, onOpenChange, permissions = [], onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_name: '',
    permissions: [],
  });

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

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation || !formData.role_name) {
      // alert('Please fill in all required fields (Name, Email, Password, Password Confirmation, and Role)');
      toast.error('Please fill in all required fields (Name, Email, Password, Password Confirmation, and Role)');
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      // alert('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', email: '', password: '', password_confirmation: '', role_name: '', permissions: [] });
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', password_confirmation: '', role_name: '', permissions: [] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            Add New Sub-Admin
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Create a new sub-admin account with customized role names and permissions.
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
                backgroundColor: '#f9fafb',
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="e.g. sub@admin4.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f9fafb',
              }}
            />
          </div>

          {/* Grid for Password & Confirmation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                }}
              />
            </div>

            {/* Password Confirmation */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
                Confirm Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                value={formData.password_confirmation}
                onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                placeholder="Confirm password"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                }}
              />
            </div>
          </div>

          {/* Role Name (Input Field as requested) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Role Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.role_name}
              onChange={(e) => setFormData(prev => ({ ...prev, role_name: e.target.value }))}
              placeholder="e.g. manager"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f9fafb',
              }}
            />
          </div>

          {/* Permissions (Dynamic checkboxes displaying permission.name and toggling permission.id) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '10px', display: 'block' }}>
              Permissions Checkbox
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
            <Plus size={16} />
            Create Sub-Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
