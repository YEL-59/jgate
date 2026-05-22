"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteConfirmationModal({ 
  isOpen, 
  title = "Delete Item", 
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm, 
  onCancel,
  isDeleting = false 
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000, 
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '24px',
        width: '100%', 
        maxWidth: '400px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '24px', 
          backgroundColor: '#FEE2E2', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <AlertTriangle style={{ color: '#EF4444' }} size={24} />
        </div>

        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: '0 0 8px 0', 
          color: '#1a1a1a' 
        }}>
          {title}
        </h3>

        <p style={{ 
          fontSize: '14px', 
          color: '#666666', 
          margin: '0 0 24px 0', 
          lineHeight: '1.5' 
        }}>
          {message}
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center' 
        }}>
          <Button 
            onClick={onCancel} 
            disabled={isDeleting}
            style={{ 
              flex: 1, 
              backgroundColor: '#f3f4f6', 
              color: '#4b5563', 
              border: 'none',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.6 : 1
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isDeleting}
            style={{ 
              flex: 1, 
              backgroundColor: '#EF4444', 
              color: 'white', 
              border: 'none',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.6 : 1
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
