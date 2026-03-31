import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Key, CreditCard, Cpu } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <PageTransition>
      <header>
        <div className="header-title">
          <h1>Account & Settings</h1>
          <p>Manage API keys, billing, and organizational access.</p>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* API Keys Section */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Key color="var(--accent-color)" size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>API Keys</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Your secret API keys carry many privileges, so ensure to keep them secure! Do not share your secret API keys in publicly accessible areas.
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>Production Key 1</span>
              <span style={{ color: 'var(--text-secondary)' }}>Created: Mar 12, 2026</span>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input type="password" value="sk_test_51NxXXXXXXXXXXXXXXXXXXXXX" readOnly style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', borderRadius: '8px', outline: 'none', letterSpacing: '2px' }} />
              <button className="glass-panel" style={{ padding: '12px 24px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontWeight: 500 }}>Reveal Key</button>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: '24px', width: 'auto', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}>+ Generate New Key</button>
        </div>

        {/* Global Configuration */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Cpu color="#f59e0b" size={24} />
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>Model Defaults</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.6' }}>Configure global constraints for new Personas. This will not override existing instance overrides.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <span>Strict Guardrails</span>
                <div style={{ width: '40px', height: '24px', background: 'var(--accent-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', right: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <span>Continuous Memory</span>
                <div style={{ width: '40px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '18px', height: '18px', background: 'var(--text-secondary)', borderRadius: '50%', position: 'absolute', top: '3px', left: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <CreditCard color="#10b981" size={24} />
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>Billing & Usage</h3>
            </div>
            
            <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Current Billing Cycle</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>$1,240.00</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: '16px' }}>
                <div style={{ width: '65%', height: '100%', background: '#10b981' }}></div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'right' }}>65% of $2000 Hard Limit</div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>Manage Payment Methods</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
