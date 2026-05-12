"use client";

import { Eye, Edit, Trash2 } from "lucide-react";

export function ProjectTable({ projects, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Draft':
        return { bg: '#F3F4F6', text: '#6B7280' };
      case 'Closed':
        return { bg: '#F3F4F6', text: '#6B7280' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Project ID</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Director</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Status</th>
            {/* <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Created</th> */}
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const statusColors = getStatusColor(project.status);
            return (
              <tr key={project.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{project.id}</td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>{project.title}</td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{project.director}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: statusColors.bg,
                    color: statusColors.text,
                  }}>
                    {project.status}
                  </span>
                </td>
                {/* <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{project.created}</td> */}
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onView && onView(project.id)}
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
                    {/* <button
                      onClick={() => onEdit && onEdit(project.id)}
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
                      <Edit size={14} />
                      Edit
                    </button> */}
                    <button
                      onClick={() => onDelete && onDelete(project.id)}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

