"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

export function DeleteCategoryModal({ open, onOpenChange, onConfirm, itemName }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '24px', 
            backgroundColor: '#FEE2E2', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <AlertTriangle style={{ color: '#EF4444' }} size={24} />
          </div>
          <DialogTitle style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Delete Category
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
            Are you sure you want to delete the category <strong>{itemName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter style={{ marginTop: '24px', gap: '12px' }}>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            style={{ flex: 1 }}
            className="hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            style={{
              backgroundColor: '#EF4444',
              color: 'white',
              fontWeight: '600',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            className="hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
