import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition.tsx';
import { useFinance } from '../context/FinanceContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import { Plus, CreditCard, Lock, Unlock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cards: React.FC = () => {
  const { cards, createVirtualCard, toggleCardFreeze } = useFinance();
  const { addToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [freezingId, setFreezingId] = useState<string | null>(null);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await createVirtualCard();
      addToast('Virtual card generated successfully! Ready to use.', 'success');
    } catch (e) {
      addToast('Failed to generate virtual card.', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleFreeze = async (id: string, isCurrentlyFrozen: boolean) => {
    setFreezingId(id);
    try {
      await toggleCardFreeze(id);
      addToast(isCurrentlyFrozen ? 'Card successfully unfrozen.' : 'Card has been frozen securely.', 'info');
    } finally {
      setFreezingId(null);
    }
  };

  return (
    <PageTransition>
      <header style={{ marginBottom: '32px' }}>
        <div className="header-title">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="heading-gradient"
          >
            My Cards
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Manage your virtual and physical spending cards.
          </motion.p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* Create Card Button Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="glass-panel create-card-box" 
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            minHeight: '220px', border: '2px dashed var(--glass-border)', cursor: isCreating ? 'default' : 'pointer', 
            transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', opacity: isCreating ? 0.7 : 1,
            background: 'var(--glass-bg)', borderRadius: '24px' // Modern corner radius
          }}
          onClick={isCreating ? undefined : handleCreate}
        >
          {isCreating ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div className="spinner-light spinner" style={{ width: 32, height: 32, borderWidth: 3 }}></div>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Generating SECURE Layer...</span>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="create-icon-wrapper" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0, 255, 170, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', transition: 'all 0.3s' }}>
                <Plus color="var(--accent-color)" size={28} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Create Virtual Card</span>
              <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <ShieldCheck size={16} /> Instant Activation
              </span>
            </div>
          )}
        </motion.div>

        {/* Generated Cards Container */}
        <AnimatePresence>
          {cards.map((card, idx) => (
            <motion.div 
              key={card.id} 
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3 + (idx * 0.1), type: 'spring', stiffness: 200, damping: 20 }}
              className="premium-credit-card"
              style={{ perspective: '1000px' }} // Perspective wrapper
            >
              <div className="card-inner" style={{ 
                padding: '28px', 
                minHeight: '220px', 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: card.color,
                borderRadius: '24px',
                boxShadow: card.isFrozen ? 'none' : '0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                filter: card.isFrozen ? 'grayscale(80%) brightness(0.6)' : 'none',
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s',
                transformStyle: 'preserve-3d',
                position: 'relative', overflow: 'hidden'
              }}>
                {/* Glossy Overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)', transform: 'translateZ(1px)', pointerEvents: 'none' }} />
                
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(20px)' }}>
                   <CreditCard size={32} color="white" />
                   <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>
                     {card.type} • {card.network}
                   </span>
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px', transform: 'translateZ(30px)' }}>
                  <div style={{ fontSize: '1.5rem', letterSpacing: '8px', fontFamily: '"Courier New", Courier, monospace', textShadow: '0 2px 4px rgba(0,0,0,0.5)', color: 'white', fontWeight: 600 }}>
                    •••• •••• •••• {card.last4}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'white', fontWeight: 500 }}>John Smith</span>
                    <button 
                      onClick={() => handleToggleFreeze(card.id, card.isFrozen)}
                      disabled={freezingId === card.id}
                      className="freeze-btn"
                      style={{ 
                        background: card.isFrozen ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.4)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        color: 'white', padding: '8px 16px', borderRadius: '12px', 
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        cursor: freezingId === card.id ? 'wait' : 'pointer', 
                        backdropFilter: 'blur(10px)', fontWeight: 600, transition: 'all 0.2s'
                      }}
                    >
                      {freezingId === card.id ? <div className="spinner-light spinner" style={{width: 14, height: 14, borderWidth: 2}}></div> : (card.isFrozen ? <Unlock size={14} color="#10b981" /> : <Lock size={14} />)}
                      {card.isFrozen ? 'Unfreeze' : 'Freeze'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

<style>{`
  .create-card-box:hover:not(:active) {
    border-color: var(--accent-color) !important;
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 255, 170, 0.1);
  }
  .create-card-box:hover .create-icon-wrapper {
    background: var(--accent-color) !important;
  }
  .create-card-box:hover .create-icon-wrapper svg {
    color: var(--bg-primary) !important;
  }
  
  .premium-credit-card:hover .card-inner {
    transform: rotateX(5deg) rotateY(-5deg) scale(1.02);
  }
  .freeze-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.2) !important;
  }
`}</style>
    </PageTransition>
  );
};

export default Cards;
