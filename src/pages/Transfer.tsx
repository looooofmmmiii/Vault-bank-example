import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition.tsx';
import { useFinance } from '../context/FinanceContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import { UserCheck, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Transfer: React.FC = () => {
  const { balance, sendMoney } = useFinance();
  const { addToast } = useToast();
  
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient) {
      addToast('Please fill in all transaction details.', 'info');
      return;
    }
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt) || numAmt <= 0) {
      addToast('Please enter a valid amount.', 'error');
      return;
    }
    if (numAmt > balance) {
      addToast('Insufficient funds available.', 'error');
      return;
    }

    setIsSending(true);
    
    try {
      await sendMoney(numAmt, recipient);
      addToast(`Successfully transferred $${numAmt.toFixed(2)} to ${recipient}`, 'success');
      setAmount('');
      setRecipient('');
    } catch (err: any) {
      addToast(err.message || 'Transfer failed. Check connection.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <PageTransition>
      <header style={{ marginBottom: '40px' }}>
        <div className="header-title">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="heading-gradient"
          >
            Money Transfer
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Securely wire funds with zero latency globally.
          </motion.p>
        </div>
      </header>

      <div className="transfer-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(450px, 1fr) 350px', gap: '40px', alignItems: 'start' }}>
        
        {/* Futuristic Main Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          onSubmit={handleSend} 
          className="glass-panel" 
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}
        >
          {/* Subtle background glow localized to the form */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'var(--accent-glow)', filter: 'blur(100px)', opacity: 0.2, pointerEvents: 'none', borderRadius: '50%' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Vault Available Balance</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="input-group">
            <label>Recipient Address or IBAN</label>
            <div className="input-wrapper">
              <UserCheck size={20} className="input-icon" />
              <input 
                type="text" 
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="@username or IBAN"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Transfer Amount (USD)</label>
            <div className="input-wrapper">
              <DollarSign size={20} className="input-icon" color="var(--accent-color)" />
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--accent-color)' }}
              />
            </div>
          </div>

          <motion.button 
            whileHover={!isSending ? { scale: 1.02 } : {}}
            whileTap={!isSending ? { scale: 0.98 } : {}}
            type="submit" 
            className="btn-primary" 
            disabled={isSending}
            style={{ padding: '18px', fontSize: '1.1rem', marginTop: '16px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}
          >
            {isSending ? (
               <><div className="spinner-light spinner"></div> Authenticating...</>
            ) : (
               <>Confirm Wire Transfer <ArrowRight size={20} /></>
            )}
          </motion.button>
        </motion.form>

        {/* Side Info Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,255,170,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <ShieldCheck color="var(--accent-color)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>Quantum Secured</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>Every transaction is secured with next-generation post-quantum cryptography, ensuring absolute safety for your funds globally.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>Zero Limitations</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>Send money instantly across 190+ countries with exact mid-market exchange rates and zero hidden fees.</p>
          </motion.div>
        </div>
      </div>

<style>{`
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .input-group label {
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
  }
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  .input-icon {
    position: absolute;
    left: 20px;
    color: var(--text-secondary);
    pointer-events: none;
    transition: color 0.3s;
  }
  .input-wrapper input {
    width: 100%;
    padding: 20px 20px 20px 56px;
    background: rgba(0,0,0,0.25);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    border-radius: 16px;
    font-size: 1.1rem;
    outline: none;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  }
  .input-wrapper input:focus {
    border-color: var(--accent-color);
    background: rgba(0,0,0,0.4);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 0 0 1px var(--accent-color), 0 0 20px var(--accent-glow);
  }
  .input-wrapper input:focus + .input-icon, 
  .input-wrapper input:not(:placeholder-shown) ~ .input-icon {
    color: var(--accent-color) !important;
  }
  
  @media (max-width: 1024px) {
    .transfer-layout {
      grid-template-columns: 1fr !important;
    }
  }
`}</style>
    </PageTransition>
  );
};

export default Transfer;
