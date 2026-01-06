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

export function EditRolesModal({ subAdmin, open, onOpenChange, onSubmit }) {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (subAdmin && subAdmin.roles && subAdmin.roles.length > 0) {
      // Pre-fill with the first role name if it exists
      setRoleName(subAdmin.roles[0].name || "");
    } else {
      setRoleName("");
    }
  }, [subAdmin, open]);

  const handleSubmit = () => {
    if (onSubmit && subAdmin) {
      // Pass the typed role name as an array with one element
      onSubmit(subAdmin.id, [roleName]);
    }
    onOpenChange(false);
  };

  if (!subAdmin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Edit Sub-Admin Role
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
            Enter the new role for {subAdmin.name}
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 0' }}>
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '12px',
              display: 'block'
            }}>
              Role Name
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g., content manager"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '15px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <DialogFooter>
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
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
