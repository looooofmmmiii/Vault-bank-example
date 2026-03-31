import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  CreditCard, 
  ArrowLeftRight, 
  ListOrdered,
  Vault
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { id: '/', icon: <PieChart size={20} />, label: 'Overview' },
    { id: '/cards', icon: <CreditCard size={20} />, label: 'My Cards' },
    { id: '/transfer', icon: <ArrowLeftRight size={20} />, label: 'Transfer Money' },
    { id: '/transactions', icon: <ListOrdered size={20} />, label: 'Transactions' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <Vault size={30} color="var(--accent-color)" strokeWidth={1.5} />
        <span>Vault</span>
      </div>
      
      <nav className="nav-menu">
        {navItems.map(item => {
          const isActive = location.pathname === item.id || (item.id !== '/' && location.pathname.startsWith(item.id));
          return (
            <NavLink 
              key={item.id}
              to={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              end={item.id === '/'}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="active-bg"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--accent-color)',
                    opacity: 0.1,
                    borderRadius: '14px',
                    border: '1px solid var(--accent-color-transparent)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {React.cloneElement(item.icon, { 
                color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                style: { position: 'relative', zIndex: 2 } 
              })}
              <span style={{ position: 'relative', zIndex: 2, color: isActive ? 'var(--text-primary)' : 'inherit' }}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="user-profile glass-panel" style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', padding: '12px' }}>
        <div className="avatar" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>JS</div>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>John Smith</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 500 }}>Premium Member</span>
        </div>
      </div>
    </aside>
  );
};
