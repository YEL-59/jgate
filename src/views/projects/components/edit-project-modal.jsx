"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProjectStatus } from "@/models/project.model";

export function EditProjectModal({ project, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    status: 'Published',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  // Initialize form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        director: project.director || '',
        genre: project.genre || '',
        status: project.status || 'Published',
        description: project.description || '',
      });
    }
  }, [project]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.director.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Call the onSave callback with updated data
      if (onSave) {
        await onSave(project.id, formData);
      }
      
      // Close modal
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original project data
    if (project) {
      setFormData({
        title: project.title || '',
        director: project.director || '',
        genre: project.genre || '',
        status: project.status || 'Published',
        description: project.description || '',
      });
    }
    onOpenChange(false);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: '700px' }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Edit Project
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
            {/* Project ID (Read-only) */}
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
              <div style={{ 
                fontSize: '16px', 
                color: '#666666', 
                fontWeight: '500',
                padding: '10px 12px',
                backgroundColor: '#F3F4F6',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
              }}>
                {project.id}
              </div>
            </div>

            {/* Title */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Title <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>

            {/* Director */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Director <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => handleChange('director', e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>

            {/* Genre */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Genre
              </label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                disabled={loading}
                placeholder="e.g., Drama, Comedy, Action"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>

            {/* Status */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                <option value={ProjectStatus.PUBLISHED}>Published</option>
                <option value={ProjectStatus.DRAFT}>Draft</option>
                <option value={ProjectStatus.CLOSED}>Closed</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={loading}
                rows={4}
                placeholder="Enter project description..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: 'white',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>
          </div>

          <DialogFooter style={{ marginTop: '24px', gap: '12px' }}>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                backgroundColor: 'white',
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: loading ? '#9CA3AF' : '#301960',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#1a1140';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#301960';
                }
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

