"use client";

export function UserTabs({ activeTab, onTabChange, tabs }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === tab.id ? '#E5E7EB' : 'transparent',
            color: activeTab === tab.id ? '#1a1a1a' : '#666666',
            fontSize: '14px',
            fontWeight: activeTab === tab.id ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s',
            borderBottom: activeTab === tab.id ? '2px solid #301960' : '2px solid transparent',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

