"use client";

import { Search } from "lucide-react";

export function ProjectSearch({ value, onChange, placeholder = "Search projects..." }) {
  return (
    <div style={{ position: 'relative', maxWidth: '400px' }}>
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#999999',
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px 10px 40px',
          borderRadius: '8px',
          border: '1px solid #e5e5e5',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#301960';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e5e5e5';
        }}
      />
    </div>
  );
}

