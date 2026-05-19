"use client";

import { useState, useEffect } from "react";
import { Save, X, User, KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EditProfileModal({ open, onOpenChange, profile, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    old_password: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);

  // Prepopulate form when profile is loaded
  useEffect(() => {
    if (profile && open) {
      setFormData({
        name: profile.name || "",
        old_password: "",
        password: "",
      });
    }
  }, [profile, open]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Verify password change matching inputs
    if (formData.password && !formData.old_password) {
      toast.error("Please enter your current password to update to a new one");
      return;
    }

    try {
      setLoading(true);
      
      // Pack into FormData matching POST form-data body requirements
      const data = new FormData();
      data.append("name", formData.name.trim());
      
      if (formData.old_password) {
        data.append("old_password", formData.old_password);
      }
      if (formData.password) {
        data.append("password", formData.password);
      }

      await onSubmit(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit profile update:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-3xl bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={24} style={{ color: '#282870' }} />
            Edit Profile
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Update your display name and change your login password.
          </DialogDescription>
        </DialogHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '12px 0' }}>
          {/* Full Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Naeem"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#ffffff',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#282870'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={{ borderTop: '1px dashed #e5e7eb', margin: '8px 0' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <KeyRound size={16} style={{ color: '#4b5563' }} />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#374151' }}>
              Change Password (Optional)
            </span>
          </div>

          {/* Current Password */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563', marginBottom: '4px', display: 'block' }}>
              Current Password
            </label>
            <input
              type="password"
              value={formData.old_password}
              onChange={(e) => setFormData(prev => ({ ...prev, old_password: e.target.value }))}
              placeholder="Enter current password"
              disabled={loading}
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

          {/* New Password */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563', marginBottom: '4px', display: 'block' }}>
              New Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter new password"
              disabled={loading}
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
        </div>

        <DialogFooter style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <Button variant="outline" onClick={handleClose} disabled={loading} className="hover:bg-gray-100 rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
