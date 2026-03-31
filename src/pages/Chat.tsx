import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Send, Bot, User, Search, Hash } from 'lucide-react';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <PageTransition className="chat-layout">
      {/* Custom localized styling for Chat layout injecting to inline to avoid massive App.css bloat */}
      <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
        
        {/* Chat Sidebar */}
        <div className="glass-panel" style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Search histories..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', outline: 'none', color: 'white', padding: '10px 10px 10px 36px', borderRadius: '8px' }} />
            </div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, padding: '12px' }}>
            {['Anomaly Detection Log', 'User Onboarding Test #4', 'Sales Pitch Generation', 'Customer Complaint Demo'].map((item, i) => (
              <div key={i} style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', background: i === 0 ? 'rgba(99,102,241,0.1)' : 'transparent', border: i === 0 ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', transition: 'background 0.2s' }}>
                <Hash size={16} color={i === 0 ? 'var(--accent-color)' : 'var(--text-secondary)'} />
                <span style={{ fontSize: '0.9rem', color: i === 0 ? 'white' : 'var(--text-secondary)', fontWeight: i === 0 ? 500 : 400 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Interface */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-color), #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>Anomaly Detection Agent</h2>
              <span style={{ fontSize: '0.85rem', color: '#10b981' }}>● Online</span>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Bot size={18} /></div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', borderTopLeftRadius: 0, color: 'var(--text-secondary)' }}>
                System initialized. Monitoring database clusters for anomalous latency spikes. 
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', maxWidth: '80%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><User size={18} /></div>
              <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), transparent)', border: '1px solid rgba(99,102,241,0.3)', padding: '16px', borderRadius: '12px', borderTopRightRadius: 0 }}>
                Can you review the AWS region eu-west-1 logs from 04:00 AM?
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Bot size={18} /></div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', borderTopLeftRadius: 0, color: 'var(--text-secondary)' }}>
                <p>Analyzing... <br/><br/>I detected a <strong>412% spike</strong> in connection timeouts for the `auth-svc` pod at 04:12 AM UTC. This correlates with a minor network partition on AWS zone eu-west-1b.</p>
              </div>
            </div>

          </div>

          <div style={{ padding: '24px' }}>
             <div className="chat-input-container" style={{ margin: 0 }}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Query the model..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && setInput('')}
              />
              <button className="send-btn" onClick={() => setInput('')}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Chat;
