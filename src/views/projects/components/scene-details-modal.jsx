"use client";

import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SceneDetailsModal({ scene, open, onOpenChange }) {
  if (!scene) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white"
        style={{ maxWidth: '900px' }}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Scene Details
          </DialogTitle>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
          {/* Video Player */}
          {(scene.scenes_upload_video || scene.videoUrl) && (
            <div style={{ 
              width: '100%', 
              backgroundColor: '#000',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              aspectRatio: '16/9'
            }}>
              <video
                src={scene.scenes_upload_video || scene.videoUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                controls
                playsInline
              />
            </div>
          )}

          {/* Scene Information Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            backgroundColor: '#f8fafc',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #f1f5f9'
          }}>
            {/* Scene ID */}
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#64748b', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Scene ID
              </label>
              <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                #{scene.id}
              </div>
            </div>

            {/* Project ID */}
            {scene.project_id && (
              <div>
                <label style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: '#64748b', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                  display: 'block'
                }}>
                  Project ID
                </label>
                <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                  #{scene.project_id}
                </div>
              </div>
            )}

            {/* Title */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#64748b', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Scene Title
              </label>
              <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>
                {scene.title}
              </div>
            </div>

            {/* Actor */}
            <div>
              <label style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: '#64748b', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block'
              }}>
                Actor
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  {scene.actor?.charAt(0) || 'A'}
                </div>
                <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                  {scene.actor}
                </div>
              </div>
            </div>

            {/* Rating - Only if exists */}
            {scene.rating && (
              <div>
                <label style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: '#64748b', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                  display: 'block'
                }}>
                  Performance Rating
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={18} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                  <span style={{ fontSize: '16px', color: '#0f172a', fontWeight: '700' }}>
                    {scene.rating} <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>/ 10</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

