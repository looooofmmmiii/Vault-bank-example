import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { Search, Bell, Settings } from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {/* Futuristic Top Bar Setup */}
        <header className="app-header">
          <div className="header-search">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search transactions, cards, or help..." />
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span className="status-dot" style={{ position: 'absolute', top: '0', right: '0', animation: 'none', width: '8px', height: '8px', background: 'var(--accent-color)' }} />
            </button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <Settings size={20} />
            </button>
            <div className="avatar" style={{ marginLeft: '8px', cursor: 'pointer', width: '40px', height: '40px' }}>
              JS
            </div>
          </div>
        </header>

        {/* Routed Pages Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
