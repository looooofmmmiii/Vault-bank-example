import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Filter } from 'lucide-react';

const data = [
  { name: 'Mon', 'Generation': 4000, 'Context': 2400 },
  { name: 'Tue', 'Generation': 3000, 'Context': 1398 },
  { name: 'Wed', 'Generation': 2000, 'Context': 9800 },
  { name: 'Thu', 'Generation': 2780, 'Context': 3908 },
  { name: 'Fri', 'Generation': 1890, 'Context': 4800 },
  { name: 'Sat', 'Generation': 2390, 'Context': 3800 },
  { name: 'Sun', 'Generation': 3490, 'Context': 4300 },
];

const Analytics: React.FC = () => {
  return (
    <PageTransition>
      <header>
        <div className="header-title">
          <h1>Metrics & Data</h1>
          <p>Deep-dive into inference expenditures and retention.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-panel" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} /> Filter
          </button>
          <button className="btn-primary" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '32px', height: '600px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '1.2rem', fontWeight: 600 }}>API Consumption Breakdown</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>Comparative analysis of context vs generated tokens per day.</p>
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
            <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.02)'}}
              contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#fff' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Context" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Generation" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </PageTransition>
  );
};

export default Analytics;
