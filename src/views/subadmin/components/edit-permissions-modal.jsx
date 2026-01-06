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
      // subAdmin.permissions is [{id, permission}]
      setSelectedPermissions(subAdmin.permissions.map(p => p.permission));
    }
  }, [subAdmin, open]);

  const handlePermissionChange = (permissionName, checked) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionName]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permissionName));
    }
  };

  const handleSubmit = () => {
    if (onSubmit && subAdmin) {
      // The API expects the role ID for permission updates.
      // We'll use the ID of the first role associated with this sub-admin.
      const roleId = (subAdmin.roles && subAdmin.roles.length > 0) ? subAdmin.roles[0].id : subAdmin.id;
      onSubmit(roleId, selectedPermissions);
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
                    checked={selectedPermissions.includes(permission.label)}
                    onChange={(e) => handlePermissionChange(permission.label, e.target.checked)}
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
            className="hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#FFC107',
              color: '#1a1a1a',
              fontWeight: '600'
            }}
            className="hover:bg-yellow-500"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

