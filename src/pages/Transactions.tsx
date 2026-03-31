import React, { useState, useMemo } from 'react';
import { PageTransition } from '../components/PageTransition.tsx';
import { useFinance } from '../context/FinanceContext.tsx';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions: React.FC = () => {
  const { transactions } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'transfer'>('all');

  // Filter Logic with useMemo for performance optimization
  const filteredData = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' ? true : tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  return (
    <PageTransition>
      <header style={{ marginBottom: '32px' }}>
        <div className="header-title">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="heading-gradient"
          >
            Transaction History
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Monitor and filter your complete account history.
          </motion.p>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="glass-panel" 
        style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)', overflow: 'hidden' }}
      >
        
        {/* Modern Toolbar */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(255,255,255,0.01)' }}>
          <div className="search-pill" style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search by recipient or ID..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '14px 20px 14px 52px', borderRadius: '100px', outline: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }} 
              className="tx-search-input"
            />
          </div>
          
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', borderRadius: '100px', padding: '6px', border: '1px solid var(--glass-border)', gap: '4px' }}>
            {(['all', 'deposit', 'transfer'] as const).map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                style={{ 
                  background: filterType === type ? 'var(--accent-color)' : 'transparent', 
                  border: 'none', 
                  color: filterType === type ? 'var(--bg-primary)' : 'var(--text-secondary)', 
                  padding: '10px 24px', 
                  borderRadius: '100px', 
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Data Table Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
          {filteredData.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '64px', textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <Filter size={48} opacity={0.5} />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>No transactions found matching your criteria.</span>
            </motion.div>
          ) : (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Transaction Details</th>
                  <th><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> Date & Time</div></th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Amount (USD)</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredData.map((tx, idx) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ 
                          width: '48px', height: '48px', borderRadius: '16px', 
                          background: tx.type === 'deposit' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: tx.type === 'deposit' ? 'inset 0 0 10px rgba(16,185,129,0.2)' : 'inset 0 0 10px rgba(245,158,11,0.2)'
                        }}>
                          {tx.type === 'deposit' ? <ArrowDownLeft color="#10b981" size={20} /> : <ArrowUpRight color="#f59e0b" size={20} />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {tx.type === 'transfer' ? `Wire Transfer to ${tx.recipient}` : 'External Account Deposit'}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>
                            REF: {tx.id.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        {new Date(tx.date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <span className={`badge badge-${tx.status === 'completed' ? 'success' : 'warning'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: tx.amount > 0 ? '#10b981' : 'var(--text-primary)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

<style>{`
  .tx-search-input:focus {
    border-color: var(--accent-color) !important;
    background: rgba(0,0,0,0.5) !important;
    box-shadow: 0 0 0 1px var(--accent-color), 0 0 20px var(--accent-glow) !important;
  }
`}</style>
    </PageTransition>
  );
};

export default Transactions;
