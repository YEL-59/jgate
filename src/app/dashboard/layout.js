export default function DashboardLayout({ children }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#F8F8F8',
      display: 'flex'
    }}>
      <div style={{
        width: '250px',
        backgroundColor: '#301960',
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ color: 'white', margin: 0 }}>Sidebar</h2>
      </div>
      <main style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: '20px'
      }}>
        {children}
      </main>
    </div>
  );
}

