"use client";

import { Clock, Mail, Bell, MessageSquare } from "lucide-react";

export function TemplatesList({ templates }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail size={16} style={{ color: '#666666' }} />;
      case 'sms':
        return <MessageSquare size={16} style={{ color: '#666666' }} />;
      case 'push':
        return <Bell size={16} style={{ color: '#666666' }} />;
      default:
        return <Mail size={16} style={{ color: '#666666' }} />;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'email':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'sms':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'push':
        return { bg: '#FEF3C7', text: '#92400E' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {/* <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', margin: 0 }}>
        Templates
      </h2> */}
      
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {templates.map((template) => {
          const badgeColors = getTypeBadgeColor(template.type);
          return (
            <div
              key={template.id}
              style={{
                padding: '16px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#301960';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(48, 25, 96, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  flexShrink: 0,
                }}>
                  <Clock size={20} style={{ color: '#666666' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                      {template.title}
                    </h3>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: badgeColors.bg,
                      color: badgeColors.text,
                      textTransform: 'capitalize',
                    }}>
                      {getTypeIcon(template.type)}
                      {template.type === 'push' ? 'Push Notification' : template.type.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#666666', margin: 0, lineHeight: '1.5' }}>
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

