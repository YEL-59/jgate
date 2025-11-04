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

export function AddSubAdminModal({ open, onOpenChange, permissions, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
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
        permissions: prev.permissions.filter(p => p !== permissionId),
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', email: '', role: '', permissions: [] });
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', role: '', permissions: [] });
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
            Create a new admin account with specific permissions.
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
          {/* Name */}
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '8px',
              display: 'block'
            }}>
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
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#301960';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '8px',
              display: 'block'
            }}>
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
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#301960';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            />
          </div>

          {/* Role */}
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '8px',
              display: 'block'
            }}>
              Role/Position <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Content Moderator"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#301960';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            />
          </div>

          {/* Permissions */}
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '12px',
              display: 'block'
            }}>
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#1a1a1a',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#301960',
                    }}
                  />
                  <span>{permission.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter style={{ marginTop: '8px' }}>
          <Button
            variant="outline"
            onClick={handleClose}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#FFC107',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            Add Sub-Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

