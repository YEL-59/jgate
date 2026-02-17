"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A premium loading spinner with absolute positioning for overlays or 
 * simple centered positioning for section placeholders.
 */
export function LoadingSpinner({ className, size = 32, label = "Loading data..." }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500",
      className
    )}>
      <div className="relative flex items-center justify-center">
        {/* Outer Glow / Ring */}
        <div 
          className="absolute inset-0 rounded-full blur-md opacity-20 bg-yellow-400 animate-pulse"
          style={{ width: size + 8, height: size + 8 }}
        />
        
        {/* Main Spinner */}
        <Loader2 
          size={size} 
          className="text-yellow-500 animate-spin transition-all" 
          strokeWidth={2.5}
        />
      </div>
      
      {label && (
        <p className="text-sm font-medium text-gray-500 tracking-wide animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

/**
 * A full-page wrapper for the loading spinner, useful during initial page loads.
 */
export function PageLoader({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full py-20 bg-white/50 backdrop-blur-sm rounded-xl">
      <LoadingSpinner size={40} label={message} />
    </div>
  );
}
