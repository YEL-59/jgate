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
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: '900px', padding: '24px' }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' }}>
            Scene Details
          </DialogTitle>
        </DialogHeader>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Video Player */}
          <div style={{ 
            width: '100%', 
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            aspectRatio: '16/9'
          }}>
            <video
              src={scene.videoUrl}
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

          {/* Scene Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Scene ID */}
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
                Scene ID
              </label>
              <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
                {scene.id}
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
                {scene.title}
              </div>
            </div>

            {/* Actor */}
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
                Actor
              </label>
              <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
                {scene.actor}
              </div>
            </div>

            {/* Rating */}
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
                Rating
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={20} style={{ fill: '#FBBF24', color: '#FBBF24' }} />
                <span style={{ fontSize: '18px', color: '#1a1a1a', fontWeight: '600' }}>
                  {scene.rating} / 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

