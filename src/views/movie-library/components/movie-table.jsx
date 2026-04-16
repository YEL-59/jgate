"use client";

import { Edit, Trash2, Play, Star } from "lucide-react";

export function MovieTable({ movies, onEdit, onDelete, onViewVideo }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>ID</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Movie Info</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Category</th>
          
          
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Created At</th>
            <th style={{ textAlign: 'right', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: '600' }}>{movie.title}</span>
                  {movie.description && (
                    <span style={{ fontSize: '12px', color: '#666666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {movie.description}
                    </span>
                  )}
                  <button 
                    onClick={() => onViewVideo && onViewVideo(movie)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '12px', 
                      color: '#FFC107', 
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontWeight: '500' 
                    }}
                  >
                    <Play size={12} fill="#FFC107" /> View Video
                  </button>
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <span style={{
                   display: 'inline-block',
                   padding: '2px 8px',
                   borderRadius: '4px',
                   fontSize: '12px',
                   backgroundColor: '#F3F4F6',
                   color: '#4B5563',
                   fontWeight: '500'
                }}>
                  {Array.isArray(movie.category) ? movie.category.join(', ') : (movie.category?.name || 'N/A')}
                </span>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{movie.create_at || '-'}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => onEdit && onEdit(movie)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      backgroundColor: 'white',
                      color: '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    title="Edit Movie"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(movie)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#FEE2E2',
                      color: '#EF4444',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    title="Delete Movie"
                  >
                    <Trash2 size={16} />
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
