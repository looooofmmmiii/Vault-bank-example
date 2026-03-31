import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout.tsx';
import { FinanceProvider } from './context/FinanceContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

import Overview from './pages/Overview.tsx';
import Cards from './pages/Cards.tsx';
import Transfer from './pages/Transfer.tsx';
import Transactions from './pages/Transactions.tsx';

import './App.css';

function App() {
  return (
    <FinanceProvider>
      <ToastProvider>
        <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Overview />} />
              <Route path="cards" element={<Cards />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
      </ToastProvider>
    </FinanceProvider>
  );
}

export default App;
