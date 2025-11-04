"use client";

import { FileText } from "lucide-react";

export function PagesList({ pages, selectedPageId, onPageSelect }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', margin: 0 }}>
        Pages
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {pages.map((page) => {
          const isSelected = selectedPageId === page.id;
          return (
            <button
              key={page.id}
              onClick={() => onPageSelect(page.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isSelected ? '#301960' : 'transparent',
                color: isSelected ? 'white' : '#1a1a1a',
                fontSize: '14px',
                fontWeight: isSelected ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FileText size={18} />
              <span>{page.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

