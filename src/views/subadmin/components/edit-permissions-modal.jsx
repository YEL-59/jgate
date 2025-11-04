"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditPermissionsModal({ subAdmin, open, onOpenChange, permissions, onSubmit }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (subAdmin && subAdmin.permissions) {
      setSelectedPermissions([...subAdmin.permissions]);
    }
  }, [subAdmin]);

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permissionId));
    }
  };

  const handleSubmit = () => {
    if (onSubmit && subAdmin) {
      onSubmit(subAdmin.id, selectedPermissions);
    }
    onOpenChange(false);
  };

  if (!subAdmin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Edit Permissions
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
            Manage permissions for {subAdmin.name}
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
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
                    checked={selectedPermissions.includes(permission.id)}
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
            onClick={() => onOpenChange(false)}
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
              backgroundColor: '#301960',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

