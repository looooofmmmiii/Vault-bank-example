import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { BarChart3, TrendingUp, TrendingDown, Server, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', tokens: 4000 },
  { time: '04:00', tokens: 3000 },
  { time: '08:00', tokens: 2000 },
  { time: '12:00', tokens: 2780 },
  { time: '16:00', tokens: 1890 },
  { time: '20:00', tokens: 2390 },
  { time: '24:00', tokens: 3490 },
];

const Dashboard: React.FC = () => {
  const metrics = [
    { title: 'Total Tokens', value: '42.8M', trend: '+14.5%', isPositive: true, icon: <Zap size={24} color="#a5b4fc" /> },
    { title: 'Active Endpoints', value: '142', trend: '+5.2%', isPositive: true, icon: <Server size={24} color="#f472b6" /> },
    { title: 'Avg Latency', value: '24ms', trend: '-2.1%', isPositive: true, icon: <BarChart3 size={24} color="#34d399" /> },
    { title: 'Cost / 1K Tokens', value: '$0.002', trend: '-0.1%', isPositive: true, icon: <TrendingDown size={24} color="#34d399" /> },
  ];

  return (
    <PageTransition>
      <header>
        <div className="header-title">
          <h1>System Dashboard</h1>
          <p>Real-time compute and telemetry monitoring.</p>
        </div>
        <button className="btn-primary" style={{ width: 'auto' }}>Generate Report</button>
      </header>

      {/* Top Stats */}
      <div className="dashboard-grid">
        {metrics.map((metric, i) => (
          <div className="metric-card glass-panel" key={i}>
            <div className="metric-header">
              <span>{metric.title}</span>
              <div className="metric-icon-wrapper">{metric.icon}</div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-trend ${metric.isPositive ? 'trend-up' : 'trend-down'}`}>
              {metric.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {metric.trend} from last week
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="glass-panel" style={{ padding: '24px', flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 600 }}>Token Consumption Volume</h3>
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#6366f1' }}
              />
              <Area type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
