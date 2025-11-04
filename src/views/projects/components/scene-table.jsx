"use client";

import { Eye, Trash2, Star } from "lucide-react";

export function SceneTable({ scenes, onView, onDelete }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Scene ID</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actor</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Rating</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Upload Date</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scenes.map((scene) => (
            <tr key={scene.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{scene.id}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>{scene.title}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{scene.actor}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} style={{ fill: '#FBBF24', color: '#FBBF24' }} />
                  <span style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{scene.rating}</span>
                </div>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{scene.uploadDate}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onView && onView(scene.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #e5e5e5',
                      backgroundColor: 'white',
                      color: '#1a1a1a',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(scene.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#EF4444',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#DC2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EF4444';
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

