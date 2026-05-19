"use client";

import { Edit, Trash2, Eye } from "lucide-react";

export function SubAdminTable({ subAdmins, onToggleStatus, onEdit, onViewDetails, onDelete }) {
  const renderPermissionsList = (permissions) => {
    if (!permissions || permissions.length === 0) {
      return (
        <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
          No permissions
        </span>
      );
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '380px' }}>
        {permissions.map((p, idx) => {
          const name = p.permission || p.name || p;
          
          let bg = '#EEF2F6';
          let color = '#475569';
          let border = '#E2E8F0';

          if (name.toLowerCase().includes('user')) {
            bg = '#EEF2FF'; // Indigo
            color = '#4F46E5';
            border = '#E0E7FF';
          } else if (name.toLowerCase().includes('project') || name.toLowerCase().includes('scene')) {
            bg = '#ECFDF5'; // Emerald
            color = '#059669';
            border = '#D1FAE5';
          } else if (name.toLowerCase().includes('setting') || name.toLowerCase().includes('mail')) {
            bg = '#FFFBEB'; // Amber
            color = '#D97706';
            border = '#FEF3C7';
          } else if (name.toLowerCase().includes('movie') || name.toLowerCase().includes('library')) {
            bg = '#FAF5FF'; // Purple
            color = '#9333EA';
            border = '#F3E8FF';
          } else if (name.toLowerCase().includes('notification') || name.toLowerCase().includes('send')) {
            bg = '#FFF1F2'; // Rose
            color = '#E11D48';
            border = '#FFE4E6';
          }

          return (
            <span
              key={p.id || idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: bg,
                color: color,
                border: `1px solid ${border}`,
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
    );
  };

  const renderRolesList = (roles) => {
    if (!roles || roles.length === 0) {
      return (
        <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
          No roles
        </span>
      );
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {roles.map((r, idx) => {
          const name = r.name || r;
          
          return (
            <span
              key={r.id || idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: '#F5F3FF', // Purple-violet tint
                color: '#6D28D9',
                border: '1px solid #DDD6FE',
                textTransform: 'capitalize',
                boxShadow: '0 1px 2px rgba(109, 40, 217, 0.05)',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Role</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Permissions</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((admin) => (
            <tr key={admin.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>
                <span 
                  onClick={() => onViewDetails && onViewDetails(admin)}
                  style={{ cursor: 'pointer', color: '#4F46E5' }}
                  className="hover:underline font-semibold"
                >
                  {admin.name}
                </span>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{admin.email}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                {renderRolesList(admin.roles)}
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>
                {renderPermissionsList(admin.permissions)}
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Sliding Toggle Switch */}
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(admin.id)}
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '24px',
                      borderRadius: '9999px',
                      backgroundColor: admin.status === 'Active' ? '#10B981' : '#D1D5DB',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      outline: 'none',
                    }}
                    aria-label={`Toggle status for ${admin.name}`}
                  >
                    {/* Sliding Circle */}
                    <span
                      style={{
                        display: 'block',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transform: admin.status === 'Active' ? 'translateX(22px)' : 'translateX(4px)',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </button>
                  {/* Status Capsule Tag */}
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: admin.status === 'Active' ? '#047857' : '#4B5563',
                      backgroundColor: admin.status === 'Active' ? '#D1FAE5' : '#F3F4F6',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      minWidth: '60px',
                      textAlign: 'center',
                    }}
                  >
                    {admin.status}
                  </span>
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onViewDetails && onViewDetails(admin)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #e5e5e5',
                      backgroundColor: 'white',
                      color: '#1a1a1a',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => onEdit && onEdit(admin)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #e5e5e5',
                      backgroundColor: 'white',
                      color: '#1a1a1a',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      onDelete && onDelete(admin);
                    }}
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
                    className="hover:bg-red-100"
                    title="Delete Sub-Admin"
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

