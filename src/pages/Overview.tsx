import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition.tsx';
import { useFinance } from '../context/FinanceContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import { Plus, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Animated Number Component
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span>${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
};

// Mock chart data representing balance history
const generateChartData = (currentBalance: number) => {
  return Array.from({ length: 7 }).map((_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    balance: currentBalance * (0.85 + Math.random() * 0.3)
  }));
};

const Overview: React.FC = () => {
  const { balance, transactions, quickDeposit } = useFinance();
  const { addToast } = useToast();
  const [isDepositing, setIsDepositing] = useState(false);
  const chartData = React.useMemo(() => generateChartData(balance), [balance]);

  const handleDeposit = async () => {
    setIsDepositing(true);
    try {
      await quickDeposit(500);
      addToast('Successfully deposited $500.00 via Quick Deposit', 'success');
    } catch (e) {
      addToast('Deposit failed', 'error');
    } finally {
      setIsDepositing(false);
    }
  };

  const recentTransactions = transactions.slice(0, 4);

  return (
    <PageTransition>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="header-title">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="heading-gradient"
          >
            Total Balance
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <AnimatedNumber value={balance} />
          </motion.div>
        </div>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="btn-primary" 
          onClick={handleDeposit}
          disabled={isDepositing}
        >
          {isDepositing ? <div className="spinner-light spinner"></div> : <Plus size={20} />}
          {isDepositing ? 'Processing...' : 'Quick Deposit'}
        </motion.button>
      </header>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', flex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-panel" 
          style={{ padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '400px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Wealth Overview</h3>
            <div className="badge badge-success" style={{ gap: '6px' }}>
              <TrendingUp size={16} /> +12.4% this week
            </div>
          </div>
          <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
            {/* Soft inner glow behind chart */}
            <div style={{ position: 'absolute', top: '20%', left: '20%', right: '20%', bottom: '20%', background: 'var(--accent-glow)', filter: 'blur(80px)', opacity: 0.3, pointerEvents: 'none' }} />
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: 'rgba(10,12,16,0.8)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: 'var(--accent-color)', fontWeight: 600 }}
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Balance']}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="var(--accent-color)" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  activeDot={{ r: 6, stroke: 'var(--bg-primary)', strokeWidth: 3, fill: 'var(--accent-color)', style: { filter: 'drop-shadow(0 0 8px var(--accent-color))' } }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="glass-panel" 
          style={{ padding: '32px' }}
        >
           <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>Recent Activity</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {recentTransactions.length === 0 ? (
               <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px 0' }}>No transactions yet</div>
             ) : recentTransactions.map((tx, idx) => (
               <motion.div 
                 key={tx.id} 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 + (idx * 0.1) }}
                 style={{ 
                   display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                   padding: '16px', background: 'rgba(255,255,255,0.02)', 
                   borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)',
                   transition: 'all 0.2s', cursor: 'pointer'
                 }}
                 className="hover-card"
               >
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ 
                     width: '44px', height: '44px', borderRadius: '12px', 
                     background: tx.type === 'deposit' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', 
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     boxShadow: tx.type === 'deposit' ? 'inset 0 0 10px rgba(16,185,129,0.2)' : 'inset 0 0 10px rgba(245,158,11,0.2)'
                   }}>
                     {tx.type === 'deposit' ? <ArrowDownLeft color="#10b981" /> : <ArrowUpRight color="#f59e0b" />}
                   </div>
                   <div>
                     <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tx.type === 'transfer' ? `To ${tx.recipient}` : 'Deposit'}</div>
                     <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</div>
                   </div>
                 </div>
                 <div style={{ fontWeight: 600, fontSize: '1rem', color: tx.amount > 0 ? '#10b981' : 'white' }}>
                   {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                 </div>
               </motion.div>
             ))}
           </div>
        </motion.div>
      </div>
{/* Hover effect style injection locally since it's just one spot, but best kept in global if reused */}
<style>{`
  .hover-card:hover { 
    background: rgba(255,255,255,0.04) !important; 
    border-color: rgba(255,255,255,0.1) !important; 
    transform: translateY(-2px); 
  }
`}</style>
    </PageTransition>
  );
};

export default Overview;
