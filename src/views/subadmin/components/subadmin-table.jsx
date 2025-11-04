"use client";

import { Edit } from "lucide-react";

export function SubAdminTable({ subAdmins, onToggleStatus, onEditPermissions }) {
  const formatPermissions = (permissions) => {
    if (!permissions || permissions.length === 0) return 'No permissions';
    
    const permissionLabels = {
      view_users: 'view users',
      manage_users: 'manage users',
      view_content: 'view content',
      manage_content: 'manage content',
      view_analytics: 'view analytics',
      manage_billing: 'manage billing',
      view_reports: 'view reports',
      send_notifications: 'send notifications',
    };

    const labels = permissions.map(p => permissionLabels[p] || p);
    
    if (labels.length <= 2) {
      return labels.join(', ');
    }
    
    return `${labels.slice(0, 2).join(', ')}, +${labels.length - 2} more`;
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
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Last Login</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#666666' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((admin) => (
            <tr key={admin.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{admin.name}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{admin.email}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>{admin.role}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    backgroundColor: '#F3F4F6',
                    color: '#4B5563',
                  }}>
                    {formatPermissions(admin.permissions)}
                  </span>
                </div>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{admin.lastLogin}</td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => onToggleStatus && onToggleStatus(admin.id, admin.status === 'Active' ? 'Inactive' : 'Active')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e5e5e5',
                    backgroundColor: admin.status === 'Active' ? '#10B981' : '#9CA3AF',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {admin.status}
                </button>
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => onEditPermissions && onEditPermissions(admin)}
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
                  Edit Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

