import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { BrainCircuit, Activity, Box, Settings2, Plus } from 'lucide-react';

const Personas: React.FC = () => {
  const agents = [
    { name: 'Nexus-7', task: 'Customer Support Lead', status: 'optimal', load: '45%', version: 'v2.4.1', color: '#10b981' },
    { name: 'Orion-Core', task: 'Data Analysis Engine', status: 'heavy', load: '92%', version: 'v4.0.0', color: '#f59e0b' },
    { name: 'Aurora-Sales', task: 'Outbound SDR Persona', status: 'idle', load: '12%', version: 'v1.9.8', color: '#6366f1' },
    { name: 'Sentinel-X', task: 'Security Threat Monitor', status: 'optimal', load: '22%', version: 'v3.1.2', color: '#10b981' },
  ];

  return (
    <PageTransition>
      <header>
        <div className="header-title">
          <h1>Active Personas</h1>
          <p>Manage, deploy, and monitor your personalized AI fleets.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Create New Card */}
        <div className="glass-panel" style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          minHeight: '260px', borderStyle: 'dashed', borderWidth: '2px', cursor: 'pointer', transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Plus color="var(--accent-color)" size={24} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Deploy New Agent</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Configure from template or scratch</span>
        </div>

        {/* Existing Agents */}
        {agents.map((agent, i) => (
          <div className="glass-panel" key={i} style={{ padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: agent.color }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <BrainCircuit color={agent.color} size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{agent.name}</h3>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{agent.task}</span>
                </div>
              </div>
              <Settings2 size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={14}/> Node Load</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{agent.load}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Box size={14}/> Version</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{agent.version}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
};

export default Personas;
