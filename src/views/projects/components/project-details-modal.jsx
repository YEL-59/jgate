"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProjectDetailsModal({ project, open, onOpenChange }) {
  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Draft':
        return { bg: '#F3F4F6', text: '#6B7280' };
      case 'Closed':
        return { bg: '#F3F4F6', text: '#6B7280' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const statusColors = getStatusColor(project.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: '800px' }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Project Details
          </DialogTitle>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
          {/* Project ID */}
          <div>
            <label style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#666666', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px',
              display: 'block'
            }}>
              Project ID
            </label>
            <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
              {project.id}
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#666666', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px',
              display: 'block'
            }}>
              Title
            </label>
            <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
              {project.title}
            </div>
          </div>

          {/* Director */}
          <div>
            <label style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#666666', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px',
              display: 'block'
            }}>
              Director
            </label>
            <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
              {project.director}
            </div>
          </div>

          {/* Genre */}
          {project.genre && (
            <div>
              <label style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#666666', 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                display: 'block'
              }}>
                Genre
              </label>
              <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
                {project.genre}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#666666', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px',
              display: 'block'
            }}>
              Status
            </label>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: statusColors.bg,
              color: statusColors.text,
            }}>
              {project.status}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <label style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#666666', 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                display: 'block'
              }}>
                Description
              </label>
              <div style={{ 
                fontSize: '15px', 
                color: '#4a5568', 
                lineHeight: '1.6',
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
              }}>
                {project.description}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

