"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AddSubAdminModal({ open, onOpenChange, permissions, roles, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: [],
    permissions: [],
  });

  const handleRoleChange = (roleId, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, roleId],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.filter(id => id !== roleId),
      }));
    }
  };

  const handlePermissionChange = (permissionLabel, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionLabel],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permissionLabel),
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || formData.roles.length === 0) {
      alert('Please fill in all required fields (Name, Email, Password, and at least one Role)');
      return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', email: '', password: '', roles: [], permissions: [] });
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', roles: [], permissions: [] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Add New Sub-Admin
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
            Create a new admin account with specific roles and permissions.
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
          {/* Name */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
              Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
              Email <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
              Password <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Roles */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px', display: 'block' }}>
              Roles <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
            }}>
              {roles && roles.map((role) => (
                <label key={role.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#1a1a1a' }}>
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role.id)}
                    onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#FFC107' }}
                  />
                  <span>{role.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px', display: 'block' }}>
              Permissions
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
            }}>
              {permissions.map((permission) => (
                <label
                  key={permission.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#1a1a1a' }}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.label)}
                    onChange={(e) => handlePermissionChange(permission.label, e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#FFC107' }}
                  />
                  <span>{permission.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter style={{ marginTop: '8px' }}>
          <Button variant="outline" onClick={handleClose} className="hover:bg-gray-100">
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
            className="hover:bg-yellow-500"
          >
            <Plus size={16} />
            Add Sub-Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

