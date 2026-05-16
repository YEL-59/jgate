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
    switch (status?.toLowerCase()) {
      case 'published':
      case 'completed':
      case 'approved':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'draft':
        return { bg: '#F3F4F6', text: '#6B7280' };
      case 'closed':
      case 'rejected':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const statusColors = getStatusColor(project.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white"
        style={{ maxWidth: '850px' }}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Project Details
          </DialogTitle>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
          
          {/* Video Section */}
          {project.video && (
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#000' }}>
              <video 
                src={project.video} 
                controls 
                style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
                poster={project.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {/* Project ID */}
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#94a3b8', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Project ID
              </label>
              <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                #{project.id}
              </div>
            </div>

            {/* Status */}
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#94a3b8', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Status
              </label>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: statusColors.bg,
                color: statusColors.text,
                textTransform: 'capitalize'
              }}>
                {project.status}
              </span>
            </div>

            {/* Title */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#94a3b8', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Title
              </label>
              <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>
                {project.title}
              </div>
            </div>

            {/* Director */}
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#94a3b8', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Director
              </label>
              <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                {project.director}
              </div>
            </div>

            {/* Genre */}
            {project.genre && (
              <div>
                <label style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: '#94a3b8', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                  display: 'block'
                }}>
                  Genre
                </label>
                <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                  {project.genre}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#94a3b8', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Description
              </label>
              <div style={{ 
                fontSize: '14px', 
                color: '#475569', 
                lineHeight: '1.6',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #f1f5f9'
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

