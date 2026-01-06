"use client";

import { Edit, Trash2 } from "lucide-react";

export function SubAdminTable({ subAdmins, onToggleStatus, onEditPermissions, onEditRoles, onDelete }) {
  const formatPermissions = (permissions) => {
    if (!permissions || permissions.length === 0) return 'No permissions';
    
    // permissions is an array of objects: { id, permission }
    const labels = permissions.map(p => p.permission || p.name || p);
    
    if (labels.length <= 2) {
      return labels.join(', ');
    }
    
    return `${labels.slice(0, 2).join(', ')}, +${labels.length - 2} more`;
  };

  const formatRoles = (roles) => {
    if (!roles || roles.length === 0) return 'No roles';
    return roles.map(r => r.name).join(', ');
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
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{admin.name}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>{admin.email}</td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {formatRoles(admin.roles)}
                </div>
              </td>
              <td style={{ padding: '12px', fontSize: '14px', color: '#666666' }}>
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
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => onToggleStatus && onToggleStatus(admin.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: admin.status === 'Active' ? '#10B981' : '#EF4444',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '80px',
                    justifyContent: 'center'
                  }}
                >
                  {admin.status}
                </button>
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onEditRoles && onEditRoles(admin)}
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
                    Edit Roles
                  </button>
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
                    }}
                  >
                    <Edit size={14} />
                    Edit Permissions
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

