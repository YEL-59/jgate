"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function VideoPlayerModal({ open, onOpenChange, videoUrl, title }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none"
        showCloseButton={false}
      >
        <DialogHeader className="p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent flex flex-row items-center justify-between">
          <DialogTitle className="text-white font-semibold truncate pr-8">
            {title}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </DialogHeader>
        
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              style={{ maxHeight: '80vh' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-white text-center p-8">
              <p>No video source available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
